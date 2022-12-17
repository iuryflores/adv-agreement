import { Router } from "express";

import Defendant from "../models/Defendant.model.js";
import Process from "../models/Process.model.js";

const router = Router();

//List Defendant
router.get("/defendant", async (req, res, next) => {
  const allDefendants = await Defendant.find({ status: true });
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
    const foundedDefendant = await Defendant.findOne({
      cnpj: cnpj,
      status: true
    });
    console.log(foundedDefendant);
    if (foundedDefendant) {
      return res.status(400).json({
        msg: `Defendant already exists!`
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

    const processFound = await Process.findOne({
      defendantId: id,
      status: true
    });

    if (processFound) {
      return res.status(400).json({
        msg: "There is a process active for this defendant. Delete this processe first."
      });
    }

    const update = { status: `${!foundDefendant.status}` };
    await Defendant.findByIdAndUpdate(id, update, {
      new: true
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
    const newDefendant = await Defendant.findByIdAndUpdate(
      { _id: id },
      {
        full_name,
        cnpj
      },
      {
        new: true
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

//Get all process from one defendant
router.get("/defendant/:id/process", async (req, res, next) => {
  const { id } = req.params;
  try {
    const defendantProcess = await Process.find({
      defendantId: id,
      status: true
    }).populate("defendantId");
    return res.status(200).json(defendantProcess);
  } catch (error) {
    next(error);
  }
});

//Create process of defendant
router.post("/defendant/:id/add-process", async (req, res, next) => {
  const { id } = req.params;
  const {
    dateProcess,
    processNumber,
    complainantName,
    subject,
    processKey,
    jurisdiction,
    judgment
  } = req.body;

  try {
    //Check if Process exists
    const foundedProcess = await Process.findOne(
      { processNumber: processNumber },
      { status: true }
    );

    if (foundedProcess) {
      return res.status(400).json({
        msg: `Process already exists!`
      });
    }

    //Create Process
    const newProcess = await Process.create({
      dateProcess,
      processNumber,
      complainantName,
      subject,
      processKey,
      jurisdiction,
      judgment,
      defendantId: id
    });

    res.status(201).json({ processNumber, complainantName });
  } catch (error) {
    next(error);
  }
});

export default router;
