import { executeQuery } from "../lib/dbConnection.js";
export * as instructionController from "./instruction.controller.js";

export const getInstruction = async (req, res, next) => {
  try {
    const query = "SELECT * FROM Instruction";
    const instructions = await executeQuery(query);

    res.json({
      status: 200,
      data: instructions,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createInstruction = async (req, res, next) => {
  try {
    const { description } = req.body;

    const query = "INSERT INTO Instruction (description) VALUES (?)";
    const values = [description];

    const createdInstruction = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const query = "UPDATE Instruction SET description=? WHERE id=?";
    const values = [description, id];

    const updatedInstruction = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM Instruction WHERE id=?";
    const values = [id];

    const deletedInstruction = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getInstructionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM Instruction WHERE id=?";
    const values = [id];

    const instructionDetail = await executeQuery(query, values);

    if (instructionDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Instruction not found",
      });
    }

    res.json({
      status: 200,
      data: instructionDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
