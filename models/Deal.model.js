import mongoose, { model, Schema, Types } from "mongoose";

const dealsSchema = new Schema(
  {
    parcelas: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reclamadaId: {
      type: Schema.Types.ObjectId,
      ref: "Reclamada",
      required: true,
    },
    valor: Number,
    processoId: { type: Schema.Types.ObjectId, ref: "Processo" },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export default model("Deals", dealsSchema);
