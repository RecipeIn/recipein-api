import { prisma } from "../lib/dbConnection.js";

export * as unitController from "./unit.controller.js";

export const getUnit = async (req, res, next) => {
  try {
    const unit = await prisma.unit.findMany();
    res.json({
      status: 200,
      data: unit,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createUnit = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Use Prisma to create the report
    const createdUnit = await prisma.unit.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdUnit,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Use Prisma to update the category
    const updatedUnit = await prisma.unit.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.json({
      status: 200,
      data: updatedUnit,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedUnit = await prisma.unit.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedUnit,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
