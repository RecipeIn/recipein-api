import { executeQuery } from "../lib/dbConnection.js";
export * as recipeController from "./recipe.controller.js";

export const getRecipe = async (req, res, next) => {
  try {
    const query = `
      SELECT
        recipe.*,
        user.username AS user_username,
        category.name AS category_name
      FROM
        Recipe recipe
      INNER JOIN
        User user ON recipe.user_id = user.id
      INNER JOIN
        Category category ON recipe.category_id = category.id
    `;

    const recipes = await executeQuery(query);

    res.json({
      status: 200,
      data: recipes,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getRecipeDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT
        recipe.*,
        user.username AS user_username,
        category.name AS category_name
      FROM
        Recipe recipe
      INNER JOIN
        User user ON recipe.user_id = user.id
      INNER JOIN
        Category category ON recipe.category_id = category.id
      WHERE
        recipe.id = ?
    `;

    const values = [id];

    const recipeDetail = await executeQuery(query, values);

    if (recipeDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Recipe not found",
      });
    }

    res.json({
      status: 200,
      data: recipeDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createRecipe = async (req, res, next) => {
  try {
    const {
      user_id,
      category_id,
      name,
      description,
      rating,
      status,
      image,
      preparation_time,
      cooking_time,
    } = req.body;

    const query =
      "INSERT INTO Recipe (name, description, rating, status, image, user_id, category_id, preparation_time, cooking_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      name,
      description,
      rating,
      status,
      image,
      user_id,
      category_id,
      preparation_time,
      cooking_time,
    ];

    const createdRecipe = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdRecipe,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      rating,
      status,
      image,
      user_id,
      category_id,
      preparation_time,
      cooking_time,
    } = req.body;

    const updateFields = {
      name,
      description,
      rating,
      status,
      image,
      user_id,
      category_id,
      preparation_time,
      cooking_time,
    };

    const validFields = Object.entries(updateFields)
      .filter(([key, value]) => value !== undefined)
      .map(([key]) => key);

    if (validFields.length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No valid fields provided for update.",
      });
    }

    const setClauses = validFields.map((field) => `${field} = ?`);
    const values = validFields.map((field) => updateFields[field]);
    values.push(id);

    const setClause = setClauses.join(", ");
    const query = `UPDATE Recipe SET ${setClause} WHERE id=?`;

    const updatedRecipe = await executeQuery(query, values);

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

    const query = "DELETE FROM Recipe WHERE id=?";
    const values = [id];

    const deletedRecipe = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedRecipe,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
