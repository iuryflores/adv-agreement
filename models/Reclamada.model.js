import mongoose, { Schema, model } from "mongoose";

const reclamadaSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    cnpj: {
      type: String,
      required: true,
      match: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/,
    },
    processos_id: {
      type: Schema.Types.ObjectId,
      ref: "Processo",
    },
    ativo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
const Reclamada = model("Reclamada", reclamadaSchema);
export default Reclamada;
