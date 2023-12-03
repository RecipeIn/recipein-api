import { prisma } from "../lib/dbConnection.js";

export * as recipeController from "./recipe.controller.js";

export const getRecipe = async (req, res, next) => {
  try {
    const recipe = await prisma.recipe.findMany();
    res.json({
      status: 200,
      data: recipe,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const { user_id, category_id, name, description, rating, status, image } =
      req.body;

    // Use Prisma to create the report
    const createdRecipe = await prisma.recipe.create({
      data: {
        name,
        description,
        rating,
        status,
        image,
        user: {
          connect: { id: user_id },
        },
        category: {
          connect: { id: category_id },
        },
      },
    });

    res.status(201).json({
      status: 201,
      data: createdRecipe,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, rating, status, image, user_id, category_id } =
      req.body;

    // Use Prisma to update the category
    const updatedRecipe = await prisma.recipe.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        rating,
        status,
        image,
        user: {
          connect: { id: user_id },
        },
        category: {
          connect: { id: category_id },
        },
      },
    });

    res.json({
      status: 200,
      data: updatedRecipe,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedRecipe,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
