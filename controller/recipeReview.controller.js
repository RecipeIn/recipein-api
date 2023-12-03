import { prisma } from "../lib/dbConnection.js";

export * as recipeReviewController from "./recipeReview.controller.js";

export const getRecipeReview = async (req, res, next) => {
  try {
    const recipeReview = await prisma.recipeReview.findMany();
    res.json({
      status: 200,
      data: recipeReview,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createRecipeReview = async (req, res, next) => {
  try {
    const { user_id, recipe_id, rating, description, date } = req.body;

    // Use Prisma to create the report
    const createdRecipeReview = await prisma.recipeReview.create({
      data: {
        user: {
          connect: { id: user_id },
        },
        recipe: {
          connect: { id: recipe_id },
        },
        rating,
        description,
        date,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdRecipeReview,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipeReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, recipe_id, rating, description, date } = req.body;

    // Use Prisma to update the category
    const updatedRecipeReview = await prisma.recipeReview.update({
      where: {
        id: parseInt(id),
      },
      data: {
        user: {
          connect: { id: user_id },
        },
        recipe: {
          connect: { id: recipe_id },
        },
        rating,
        description,
        date,
      },
    });

    res.json({
      status: 200,
      data: updatedRecipeReview,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedRecipeReview = await prisma.recipeReview.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedRecipeReview,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
