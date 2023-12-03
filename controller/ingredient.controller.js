import { prisma } from "../lib/dbConnection.js";

export * as ingredientController from "./ingredient.controller.js";

export const getIngredient = async (req, res, next) => {
  try {
    const ingredient = await prisma.ingredient.findMany();
    res.json({
      status: 200,
      data: ingredient,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createIngredient = async (req, res, next) => {
  try {
    const { name, image } = req.body;

    // Use Prisma to create the report
    const createdIngredient = await prisma.ingredient.create({
      data: {
        name,
        image,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdIngredient,
    });
  } catch (error) {
    next(error);
  }
};

export const updateIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image } = req.body;

    // Use Prisma to update the category
    const updatedIngredient = await prisma.ingredient.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        image,
      },
    });

    res.json({
      status: 200,
      data: updatedIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
