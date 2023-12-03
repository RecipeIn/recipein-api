import { prisma } from "../lib/dbConnection.js";

export * as recipeInstructionController from "./recipeInstruction.controller.js";

export const getRecipeInstruction = async (req, res, next) => {
  try {
    const recipeInstruction = await prisma.recipeInstruction.findMany();
    res.json({
      status: 200,
      data: recipeInstruction,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createRecipeInstruction = async (req, res, next) => {
  try {
    const { recipe_id, instruction_id } = req.body;

    // Use Prisma to create the report
    const createdRecipeInstruction = await prisma.recipeInstruction.create({
      data: {
        recipe: {
          connect: { id: recipe_id },
        },
        instruction: {
          connect: { id: instruction_id },
        },
      },
    });

    res.status(201).json({
      status: 201,
      data: createdRecipeInstruction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipeInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, instruction_id } = req.body;

    // Use Prisma to update the category
    const updatedRecipeInstruction = await prisma.recipeInstruction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        recipe: {
          connect: { id: recipe_id },
        },
        instruction: {
          connect: { id: instruction_id },
        },
      },
    });

    res.json({
      status: 200,
      data: updatedRecipeInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedRecipeInstruction = await prisma.recipeInstruction.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedRecipeInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
