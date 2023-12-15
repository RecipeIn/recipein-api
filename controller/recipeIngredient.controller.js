import { executeQuery } from "../lib/dbConnection.js";
export * as recipeIngredientController from "./recipeIngredient.controller.js";

export const getRecipeIngredient = async (req, res, next) => {
  try {
    const query =
      "SELECT ri.*, r.name AS recipe_name, i.name AS ingredient_name, u.name AS unit_name FROM RecipeIngredient ri " +
      "JOIN Recipe r ON ri.recipe_id = r.id " +
      "JOIN Ingredient i ON ri.ingredient_id = i.id " +
      "JOIN Unit u ON ri.unit_id = u.id";

    console.log("Generated SQL Query:", query); // Add this line for debugging

    const recipeIngredients = await executeQuery(query);

    res.json({
      status: 200,
      data: recipeIngredients,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getRecipeIngredientDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT ri.*, r.name AS recipe_name, i.name AS ingredient_name, u.name AS unit_name FROM RecipeIngredient ri " +
      "JOIN Recipe r ON ri.recipe_id = r.id " +
      "JOIN Ingredient i ON ri.ingredient_id = i.id " +
      "JOIN Unit u ON ri.unit_id = u.id " +
      "WHERE ri.id=?";

    const values = [id];

    const recipeIngredientDetail = await executeQuery(query, values);

    if (recipeIngredientDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "RecipeIngredient not found",
      });
    }

    res.json({
      status: 200,
      data: recipeIngredientDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};


export const createRecipeIngredient = async (req, res, next) => {
  try {
    const { recipe_id, ingredient_id, unit_id, qty } = req.body;

    const query =
      "INSERT INTO RecipeIngredient (recipe_id, ingredient_id, unit_id, qty) VALUES (?, ?, ?, ?)";
    const values = [recipe_id, ingredient_id, unit_id, qty];

    const createdRecipeIngredient = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdRecipeIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateRecipeIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, ingredient_id, unit_id, qty } = req.body;

    // Determine which field to update
    const updateFields = { recipe_id, ingredient_id, unit_id, qty };
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
    const query = `UPDATE RecipeIngredient SET ${setClause} WHERE id=?`;

    const updatedRecipeIngredient = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedRecipeIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM RecipeIngredient WHERE id=?";
    const values = [id];

    const deletedRecipeIngredient = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedRecipeIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};