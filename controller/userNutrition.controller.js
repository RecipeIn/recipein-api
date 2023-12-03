import { prisma } from "../lib/dbConnection.js";

export * as userNutritionController from "./userNutrition.controller.js";

export const getUserNutrition = async (req, res, next) => {
  try {
    const userNutrition = await prisma.userNutrition.findMany();
    res.json({
      status: 200,
      data: userNutrition,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const getUserNutritionByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // Use Prisma to get user favorites by user ID
    const userNutrition = await prisma.userNutrition.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });

    res.json({
      status: 200,
      data: userNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createUserNutrition = async (req, res, next) => {
  try {
    const { user_id, calories, protein, carbohydrate, vitamin, fiber, fat } =
      req.body;

    // Use Prisma to create the report
    const createdUserNutrition = await prisma.userNutrition.create({
      data: {
        user: {
          connect: { id: user_id },
        },
        calories,
        protein,
        carbohydrate,
        vitamin,
        fiber,
        fat,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdUserNutrition,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, calories, protein, carbohydrate, vitamin, fiber, fat } =
      req.body;

    // Use Prisma to update the category
    const updatedUserNutrition = await prisma.userNutrition.update({
      where: {
        id: parseInt(id),
      },
      data: {
        user: {
          connect: { id: user_id },
        },
        calories,
        protein,
        carbohydrate,
        vitamin,
        fiber,
        fat,
      },
    });

    res.json({
      status: 200,
      data: updatedUserNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteUserNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedUserNutrition = await prisma.userNutrition.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedUserNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
