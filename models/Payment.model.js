import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  price: Number,
  dueDate: { type: Date, required: true },
  payDay: Date,
  quota: Number,
  totalQuota: Number,
  status: { type: Boolean, default: true },
});
