import { prisma } from "../lib/dbConnection.js";

export * as nutritionController from "./nutrition.controller.js";

export const getNutrition = async (req, res, next) => {
  try {
    const nutrition = await prisma.nutrition.findMany();
    res.json({
      status: 200,
      data: nutrition,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createNutrition = async (req, res, next) => {
  try {
    const { description } = req.body;

    // Use Prisma to create the report
    const createdNutrition = await prisma.nutrition.create({
      data: {
        description,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdNutrition,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Use Prisma to update the category
    const updatedNutrition = await prisma.nutrition.update({
      where: {
        id: parseInt(id),
      },
      data: {
        description,
      },
    });

    res.json({
      status: 200,
      data: updatedNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedNutrition = await prisma.nutrition.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
