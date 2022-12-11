import { Router } from "express";

import Deal from "../models/Deal.model.js";
import Payment from "../models/Payment.model.js";

const router = Router();

//List all deals
router.get("/deals", async (req, res, next) => {
  try {
    const allDeals = await Deal.find();
    return res.status(200).json(allDeals);
  } catch (error) {
    next(error);
  }
});

//Create deal
router.post("/process/:id/add-deal", async (req, res, next) => {
  const { quotas, price, dueDate, defendantId, processId } = req.body;

  try {
    //Check if userId, defendantId and processId was provided.
    if (!defendantId || !processId) {
      return res.status(400).json({ msg: "Fill in the mandatory fields." });
    }

    //Create new deal
    const newDeal = await Deal.create({
      quotas,
      price,
      defendantId,
      processId
    });

    //Creating payments based on the created deal
    const { _id } = newDeal;

    let quotaPrice = price / quotas;
    var newDate = new Date(dueDate);

    for (let quota = 1; quota <= quotas; quota++) {
      await Payment.create({
        price: quotaPrice,
        dueDate: newDate,
        quota: quota,
        totalQuota: quotas,
        dealId: _id
      });
      //Set 30 days to next payment
      newDate.setDate(newDate.getDate() + 30);
    }
    return res.status(201).json(newDeal);
  } catch (error) {
    next(error);
  }
});

//Delete deal
router.delete("/deal/:id", async (req, res, next) => {
  const { id } = req.params;

  //Finding the deal
  const foundDeal = await Deal.findById(id);

  //Check if deal exists
  if (!foundDeal) {
    return res.status(404).json({ msg: "Deal not found!" });
  }
  //Delete de deal
  await Deal.findByIdAndDelete(id);
  //Delete all payments from that deal
  await Payment.deleteMany({ dealId: id });

  res.status(200).json({ msg: `${foundDeal._id} deleted successfully.` });
});

//Edit deal
router.patch("/deal/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDeal = await Deal.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return res.status(200).json({ msg: "Deal updated" });
  } catch (error) {
    next(error);
  }
});

//List deals from a specific defendant
router.get("/deal/defendant/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDeals = await Deal.find({ defendantId: id }).populate(
      "defendantId processId"
    );
    return res.status(200).json(foundDeals);
  } catch (error) {
    next(error);
  }
});

//List deals from a specific process
router.get("/deal/process/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDeals = await Deal.find({ processId: id });
    return res.status(200).json(foundDeals);
  } catch (error) {}
});

export default router;
