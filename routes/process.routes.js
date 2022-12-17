import { Router } from "express";
import Deal from "../models/Deal.model.js";
import Defendant from "../models/Defendant.model.js";

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
    const processFound = await Process.findById(id).populate("defendantId");

    return res.status(200).json(processFound);
  } catch (error) {
    next(error);
  }
});
//Get process by id to edit
router.get("/process-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const processFound = await Process.findById(id).populate("defendantId");

    return res.status(200).json(processFound);
  } catch (error) {
    next(error);
  }
});
//Create new process
router.post("/process", async (req, res, next) => {
  const {
    dateProcess,
    processNumber,
    complainantName,
    subject,
    processKey,
    jurisdiction,
    judgment,
    defendantId
  } = req.body;

  try {
    if (!dateProcess || !complainantName || !defendantId) {
      return res
        .status(400)
        .json({ msg: "Process date and complainant name is required." });
    }

    const foundProcess = await Process.findOne({
      processNumber: processNumber
    });
    if (foundProcess) {
      return res
        .status(400)
        .json({ msg: `Process n. ${processNumber} already exists!` });
    }

    const newProcess = await Process.create({
      dateProcess,
      processNumber,
      defendantId,
      complainantName,
      subject,
      processKey,
      jurisdiction,
      judgment
    });
    const { _id } = newProcess._id;
    await Defendant.findByIdAndUpdate(defendantId, {
      $push: { process_id: _id }
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

  try {
    const foundProcess = await Process.findById(id);

    if (!foundProcess) {
      return res.status(404).json({ msg: "Not found!" });
    }

    const foundDeal = await Deal.findOne({ processId: id });

    if (foundDeal) {
      return res.status(400).json({
        msg: "There is an active deal for this process! Please delete deal first."
      });
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
