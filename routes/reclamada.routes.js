import { Router } from "express";
import Reclamada from "../models/Reclamada.model.js";

const router = Router();

//List Reclamada
router.get("/reclamada", async (req, res, next) => {
  const allReclamadas = await Reclamada.find();
  res.status(200).json(allReclamadas);
});

export default router;
