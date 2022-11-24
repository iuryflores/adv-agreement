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
      match:
        /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
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
