import mongoose, { Schema, model } from "mongoose";

const defendantSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    cnpj: {
      type: String,
      required: true,
      match: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
    },
    process_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "Process"
      }
    ],
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);
export default model("Defendant", defendantSchema);
