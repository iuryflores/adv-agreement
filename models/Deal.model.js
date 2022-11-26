import mongoose, { model, Schema, Types } from "mongoose";

const dealsSchema = new Schema(
  {
    quotas: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    defendantId: {
      type: Schema.Types.ObjectId,
      ref: "Defendant",
      required: true,
    },
    price: Number,
    processId: { type: Schema.Types.ObjectId, ref: "Process", required: true },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export default model("Deals", dealsSchema);
