import { Router } from "express";

import Payment from "../models/Payment.model.js";

const router = Router();

//List all payments
router.get("/payments", async (req, res, next) => {
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
router.put("/payment/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundPayment = await Payment.findById(id);
    res.status(200).json(foundPayment);
  } catch (error) {
    next(error);
  }
});

export default router;
