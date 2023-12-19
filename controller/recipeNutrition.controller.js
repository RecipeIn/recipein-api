import { executeQuery } from "../lib/dbConnection.js";
export * as recipeNutritionController from "./recipeNutrition.controller.js";

export const getRecipeNutritions = async (req, res, next) => {
  try {
    const query =
      "SELECT ri.*, i.description AS nutrition_description FROM RecipeNutrition ri " +
      "JOIN Nutrition i ON ri.nutrition_id = i.id";

    const recipeNutritions = await executeQuery(query);

    res.json({
      status: 200,
      data: recipeNutritions,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getRecipeNutritionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT ri.*, i.description AS nutrition_description FROM RecipeNutrition ri " +
      "JOIN Nutrition i ON ri.nutrition_id = i.id " +
      "WHERE ri.id=?";
    const values = [id];

    const recipeNutritionDetail = await executeQuery(query, values);

    if (recipeNutritionDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "RecipeNutrition not found",
      });
    }

    res.json({
      status: 200,
      data: recipeNutritionDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createRecipeNutrition = async (req, res, next) => {
  try {
    const { recipe_id, nutrition_id, qty } = req.body;

    const query =
      "INSERT INTO RecipeNutrition (recipe_id, nutrition_id, qty) VALUES (?, ?, ?)";
    const values = [recipe_id, nutrition_id, qty];

    const createdRecipeNutrition = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdRecipeNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateRecipeNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, nutrition_id, qty } = req.body;

    // Determine which field to update
    const updateFields = { recipe_id, nutrition_id, qty };
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
    const query = `UPDATE RecipeNutrition SET ${setClause} WHERE id=?`;

    const updatedRecipeNutrition = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedRecipeNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM RecipeNutrition WHERE id=?";
    const values = [id];

    const deletedRecipeNutrition = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedRecipeNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
