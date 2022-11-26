import { Router } from "express";

import Deal from "../models/Deal.model.js";

const router = Router();

//List all deals
router.get("/deal", async (req, res, next) => {
  try {
    const allDeals = await Deal.find();
    return res.status(200).json(allDeals);
  } catch (error) {
    next(error);
  }
});

//Create deal
router.post("/deal", async (req, res, next) => {
  const { quotas, userId, defendantId, price, processId } = req.body;

  if (!userId || !defendantId || !processId) {
    return res.status(400).json({ msg: "Fill in the mandatory fields." });
  }
  try {
    const newDeal = await Deal.create({ ...req.body });
    return res.status(201).json(newDeal);
  } catch (error) {
    next(error);
  }
});

//Delete deal
router.delete("/deal/:id", async (req, res, next) => {
  const { id } = req.params;

  const foundDeal = await Deal.findById(id);

  if (!foundDeal) {
    return res.status(404).json({ msg: "Deal not found!" });
  }

  await Deal.findByIdAndDelete(id);
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
    const foundDeals = await Deal.find({ defendantId: id });
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
