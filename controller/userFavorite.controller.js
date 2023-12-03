import { prisma } from "../lib/dbConnection.js";

export const getUserFavorite = async (req, res, next) => {
  try {
    const userFavorite = await prisma.userFavorite.findMany();
    res.json({
      status: 200,
      data: userFavorite,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const getUserFavoriteByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    // Use Prisma to get user favorites by user ID
    const userFavorites = await prisma.userFavorite.findMany({
      where: {
        user_id: parseInt(user_id),
      },
    });

    res.json({
      status: 200,
      data: userFavorites,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUserFavoriteByRecipeId = async (req, res, next) => {
  try {
    const { recipe_id } = req.params;

    // Use Prisma to get user favorites by recipe ID
    const userFavorites = await prisma.userFavorite.findMany({
      where: {
        recipe_id: parseInt(recipe_id),
      },
    });

    res.json({
      status: 200,
      data: userFavorites,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createUserFavorite = async (req, res, next) => {
  try {
    const { user_id, recipe_id } = req.body;

    // Use Prisma to create the report
    const createdUserFavorite = await prisma.userFavorite.create({
      data: {
        user: {
          connect: { id: user_id },
        },
        recipe: {
          connect: { id: recipe_id },
        },
      },
    });

    res.status(201).json({
      status: 201,
      data: createdUserFavorite,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, recipe_id } = req.body;

    // Use Prisma to update the category
    const updatedUserFavorite = await prisma.userFavorite.update({
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
      },
    });

    res.json({
      status: 200,
      data: updatedUserFavorite,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteUserFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedUserFavorite = await prisma.userFavorite.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedUserFavorite,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
