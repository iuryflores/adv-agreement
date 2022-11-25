import { Router } from "express";
import Reclamada from "../models/Reclamada.model.js";

const router = Router();

//List Reclamada
router.get("/reclamada", async (req, res, next) => {
  const allReclamadas = await Reclamada.find();
  res.status(200).json(allReclamadas);
});

//Create reclamada
router.post("/reclamada", async (req, res, next) => {
  const { body } = req;

  //Get data from body
  let { full_name, cnpj } = req.body;

  //Check if all fields are filled
  if (!full_name || !cnpj) {
    return res.status(400).json({ msg: "All fields are required!" });
  }

  //Check if cnpj is valid
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  if (!cnpjRegex.test(cnpj)) {
    return res.status(400).json({ msg: "CNPJ invalid!" });
  }
  try {
    //Check if reclamada exists
    const foundedReclamada = await Reclamada.findOne({ cnpj });
    if (foundedReclamada) {
      return res.status(400).json({
        msg: `Reclamada already exists!`,
      });
    }

    //Create reclamada
    const newReclamada = await Reclamada.create({ full_name, cnpj });

    //Get id from newReclamada
    const { _id } = newReclamada;

    res.status(201).json({ full_name, cnpj });
  } catch (error) {
    next(error);
  }
});

export default router;
