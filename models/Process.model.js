import mongoose, { model, Schema } from "mongoose";

const processSchema = new Schema(
  {
    dateProcess: { type: Date, required: true },
    processNumber: String,
    defendantId: { type: Schema.Types.ObjectId, ref: "Defendant" },
    complainantName: { type: String, required: true },
    subject: String,
    processKey: String,
    jurisdiction: String,
    judgment: String,
    dealId: { type: Schema.Types.ObjectId, ref: "Deals" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default model("Process", processSchema);
