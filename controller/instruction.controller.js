import { prisma } from "../lib/dbConnection.js";

export * as instructionController from "./instruction.controller.js";

export const getInstruction = async (req, res, next) => {
  try {
    const instruction = await prisma.instruction.findMany();
    res.json({
      status: 200,
      data: instruction,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createInstruction = async (req, res, next) => {
  try {
    const { description } = req.body;

    // Use Prisma to create the report
    const createdInstruction = await prisma.instruction.create({
      data: {
        description,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdInstruction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Use Prisma to update the category
    const updatedInstruction = await prisma.instruction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description,
      },
    });

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

    // Use Prisma to delete the category
    const deletedInstruction = await prisma.instruction.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
