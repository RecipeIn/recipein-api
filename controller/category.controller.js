import { prisma } from "../lib/dbConnection.js";

export * as categoryController from "./category.controller.js";

export const getCategory = async (req, res, next) => {
  try {
    const category = await prisma.category.findMany();
    res.json({
      status: 200,
      data: category,
    });
  } catch (error) {
    throw new error(`Error: ${error}`);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Use Prisma to create the report
    const createdCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      status: 201,
      data: createdCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Use Prisma to update the category
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });

    res.json({
      status: 200,
      data: updatedCategory,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Use Prisma to delete the category
    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({
      status: 200,
      data: deletedCategory,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
