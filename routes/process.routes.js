import { Router } from "express";

import Process from "../models/Process.model.js";

const router = Router();

//Get all process
router.get("/process", async (req, res, next) => {
  try {
    const allProcess = await Process.find();
    return res.status(200).json(allProcess);
  } catch (error) {
    next(error);
  }
});

//Create new process
router.post("/process/:id", async (req, res, next) => {
  const {
    dateProcess,
    processNumber,
    complainantName,
    subject,
    processKey,
    jurisdiction,
    judgment,
  } = req.body;
  const { id } = req.params;

  try {
    if (!dateProcess || !complainantName) {
      return res
        .status(400)
        .json({ msg: "Process date and complainant name is required." });
    }

    const foundProcess = await Process.findOne({
      processNumber: processNumber,
    });
    if (foundProcess) {
      return res
        .status(404)
        .json({ msg: `Process n. ${processNumber} already exists!` });
    }

    const newProcess = await Process.create({
      dateProcess,
      processNumber,
      defendantId: id,
      complainantName,
      subject,
      processKey,
      jurisdiction,
      judgment,
    });
    return res.status(201).json(newProcess);
  } catch (error) {
    next(error);
  }
});

export default router;
