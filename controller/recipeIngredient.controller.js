import { prisma } from "../lib/dbConnection.js";

export * as recipeIngredientController from "./recipeIngredient.controller.js";

export const getRecipeIngredient = async (req, res, next) => {
  try {
    const recipeIngredient = await prisma.recipeIngredient.findMany();
    res.json({
      status: 200,
      data: recipeIngredient,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createRecipeIngredient = async (req, res, next) => {
  try {
    const { recipe_id, ingredient_id, unit_id, qty } = req.body;

    // Use Prisma to create the report
    const createdRecipeIngredient = await prisma.recipeIngredient.create({
      data: {
        recipe: {
          connect: { id: recipe_id },
        },
        ingredient: {
          connect: { id: ingredient_id },
        },
        unit: {
          connect: { id: unit_id },
        },
        qty,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdRecipeIngredient,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipeIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, ingredient_id, unit_id, qty } = req.body;

    // Use Prisma to update the category
    const updatedRecipeIngredient = await prisma.recipeIngredient.update({
      where: {
        id: parseInt(id),
      },
      data: {
        recipe: {
          connect: { id: recipe_id },
        },
        ingredient: {
          connect: { id: ingredient_id },
        },
        unit: {
          connect: { id: unit_id },
        },
        qty,
      },
    });

    res.json({
      status: 200,
      data: updatedRecipeIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedRecipeIngredient = await prisma.recipeIngredient.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedRecipeIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
