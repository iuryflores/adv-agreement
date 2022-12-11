import { Router } from "express";

import Process from "../models/Process.model.js";

const router = Router();

//Get all process
router.get("/process", async (req, res, next) => {
  try {
    const allProcess = await Process.find({ status: true }).populate(
      "defendantId"
    );
    return res.status(200).json(allProcess);
  } catch (error) {
    next(error);
  }
});

//Get process by id
router.get("/process/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const processFound = await Process.findById(id).populate(
      "defendantId"
    );
    console.log(processFound);
    return res.status(200).json(processFound);
  } catch (error) {
    next(error);
  }
});
//Get process to add deal
router.get("/process/:id/add-deal", async (req, res, next) => {
  const { id } = req.params;
  try {
    const processFound = await Process.find({ _id: id, status: true }).populate(
      "defendantId"
    );
    return res.status(200).json(processFound);
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
    judgment
  } = req.body;
  const { id } = req.params;

  try {
    if (!dateProcess || !complainantName) {
      return res
        .status(400)
        .json({ msg: "Process date and complainant name is required." });
    }

    const foundProcess = await Process.findOne({
      processNumber: processNumber
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
      judgment
    });
    return res.status(201).json(newProcess);
  } catch (error) {
    next(error);
  }
});

//Edit process
router.put("/process/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const updateProcess = await Process.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json(updateProcess);
  } catch (error) {
    next(error);
  }
});

//Delete process
router.delete("/process/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  try {
    const foundProcess = await Process.findById(id);
    console.log(foundProcess);
    if (!foundProcess) {
      return res.status(404).json({ msg: "Not found!" });
    }
    const update = { status: `${!foundProcess.status}` };
    const processUpdated = await Process.findByIdAndUpdate(id, update, {
      new: true
    });
    return res.status(200).json(processUpdated);
  } catch (error) {
    next(error);
  }
});

export default router;
