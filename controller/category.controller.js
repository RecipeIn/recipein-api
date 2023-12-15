import { executeQuery } from "../lib/dbConnection.js";
export * as categoryController from "./category.controller.js";

export const getCategory = async (req, res, next) => {
  try {
    const query = "SELECT * FROM Category";
    const categories = await executeQuery(query);

    res.json({
      status: 200,
      data: categories,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getCategoryDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM Category WHERE id=?";
    const values = [id];

    const categoryDetail = await executeQuery(query, values);

    if (categoryDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Category not found",
      });
    }

    res.json({
      status: 200,
      data: categoryDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};


export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const query = "INSERT INTO Category (name) VALUES (?)";
    const values = [name];

    const createdCategory = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdCategory,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const query = "UPDATE Category SET name=? WHERE id=?";
    const values = [name, id];

    const updatedCategory = await executeQuery(query, values);

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

    const query = "DELETE FROM Category WHERE id=?";
    const values = [id];

    const deletedCategory = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedCategory,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
