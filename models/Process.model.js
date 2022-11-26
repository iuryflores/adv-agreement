import mongoose, { model, Schema } from "mongoose";

const processSchema = new Schema(
  {
    dataProcess: { type: Date, required: true },
    reclamadaId: { type: Schema.Types.ObjectId, ref: "Reclamada" },
    nomeReclamante: { type: String, required: true },
    subject: String,
    processKey: String,
    jurisdiction: String,
    judgment: String,
    dealId: { type: Schema.Types.ObjectId, ref: "Deals" },
    ativo: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export default model("Process", processSchema);
