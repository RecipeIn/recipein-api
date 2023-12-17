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
    const { name, description, image } = req.body;

    const query =
      "INSERT INTO Category (name, description, image) VALUES (?, ?, ?)";
    const values = [name, description, image];

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
    const { name, description, image } = req.body;

    // Check if at least one valid field is provided
    if (name || description || image) {
      const updateFields = { name, description, image };
      const setClauses = Object.entries(updateFields)
        .filter(([key, value]) => value !== undefined)
        .map(([key, value]) => `${key} = ?`);

      const values = Object.values(updateFields).filter(
        (value) => value !== undefined
      );
      values.push(id);

      const setClause = setClauses.join(", ");
      const query = `UPDATE Category SET ${setClause} WHERE id=?`;

      const updatedCategory = await executeQuery(query, values);

      res.json({
        status: 200,
        data: updatedCategory,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "No valid fields provided for update.",
      });
    }
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
