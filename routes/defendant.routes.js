import { Router } from "express";

import Defendant from "../models/Defendant.model.js";

const router = Router();

//List Defendant
router.get("/defendant", async (req, res, next) => {
  const allDefendants = await Defendant.find();
  res.status(200).json(allDefendants);
});

//Create defendant
router.post("/defendant", async (req, res, next) => {
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
    //Check if defendant exists
    const foundedDefendant = await Defendant.findOne({ cnpj });
    if (foundedDefendant) {
      return res.status(400).json({
        msg: `Defendant already exists!`,
      });
    }

    //Create defendant
    const newDefendant = await Defendant.create({ full_name, cnpj });

    //Get id from newDefendant
    const { _id } = newDefendant;

    res.status(201).json({ full_name, cnpj });
  } catch (error) {
    next(error);
  }
});

//Get one defendant
router.get("/defendant/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDefendant = await Defendant.findById(id);
    return res.status(201).json(foundDefendant);
  } catch (error) {
    next(error);
  }
});

//Logic delete defendant
router.delete("/defendant/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundDefendant = await Defendant.findById(id);
    const update = { status: `${!foundDefendant.status}` };
    await Defendant.findByIdAndUpdate(id, update, {
      new: true,
    });
    return res.status(201).json(update);
  } catch (error) {
    next(error);
  }
});

//Edit defendant
router.put("/defendant/:id", async (req, res, next) => {
  const { id } = req.params;
  const { full_name, cnpj } = req.body;

  try {
    const newDefendant = await Defendant.findOneAndUpdate(
      id ,
      {
        full_name,
        cnpj,
      },
      {
        new: true,
      }
    );
    if (!newDefendant) {
      return res.status(404).json({ msg: `${full_name} not found!` });
    }
    return res.status(200).json(newDefendant);
  } catch (error) {
    next(error);
  }
});

export default router;
