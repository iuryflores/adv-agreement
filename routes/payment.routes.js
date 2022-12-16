import { Router } from "express";

import Payment from "../models/Payment.model.js";

const router = Router();

//List all parcels
router.get("/parcels", async (req, res, next) => {
  try {
    const allPayments = await Payment.find({ payDay: null }).populate("dealId").sort({dueDate:1});
    res.status(200).json(allPayments);
  } catch (error) {
    next(error);
  }
});
//List parcels by deal
router.get("/parcels/bydeal/:dealId", async (req, res, next) => {
  const { dealId } = req.params;
  try {
    const allPayments = await Payment.find({ dealId }).populate({
      path: "dealId",
      populate: { path: "processId defendantId" },
    });
    res.status(200).json(allPayments);
  } catch (error) {
    next(error);
  }
});

//List all payments
router.get("/parcels/:id", async (req, res, next) => {
  try {
    const allPayments = await Payment.find();
    res.status(200).json(allPayments);
  } catch (error) {
    next(error);
  }
});
//List paid parcel
router.get("/payments/paid", async (req, res, next) => {
  try {
    const allPaid = await Payment.find({ payDay: { $ne: null } });
    res.status(200).json(allPaid);
  } catch (error) {
    next(error);
  }
});
//Pay a parcel
router.put("/payment/pay/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPayment = await Payment.find({ dealId: id });

    if (!foundPayment) {
      return res.status(404).json({ msg: "Payment not found!" });
    }

    const today = new Date();

    const paid = await Payment.findByIdAndUpdate(
      id,
      { payDay: today },
      { new: true }
    );

    res.status(200).json(paid);
  } catch (error) {
    next(error);
  }
});

//Edit payment
router.put("/payment/edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const { price, dueDate, payDay } = req.body;

  try {
    const foundPayment = await Payment.findById(id);

    if (!foundPayment) {
      return res.status(404).json({ msg: "Payment not found!" });
    }

    const newPayment = await Payment.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(newPayment);
  } catch (error) {
    next(error);
  }
});

//Edit remove payday
router.delete("/payment/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPayment = await Payment.findById(id);
    if (!foundPayment) {
      return res.status(404).json({ msg: "Payment not found!" });
    }
    const payDayDeleted = await Payment.findByIdAndUpdate(
      id,
      { payDay: null },
      { new: true }
    );
    res.status(200).json(payDayDeleted);
  } catch (error) {}
});

export default router;
