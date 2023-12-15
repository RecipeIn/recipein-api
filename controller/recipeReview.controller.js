import { executeQuery } from "../lib/dbConnection.js";
export * as recipeReviewController from "./recipeReview.controller.js";

export const getRecipeReview = async (req, res, next) => {
  try {
    const query =
      "SELECT rr.*, u.username AS user_username, r.name AS recipe_name " +
      "FROM RecipeReview rr " +
      "JOIN User u ON rr.user_id = u.id " +
      "JOIN Recipe r ON rr.recipe_id = r.id";

    const recipeReviews = await executeQuery(query);

    res.json({
      status: 200,
      data: recipeReviews,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getRecipeReviewDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT rr.*, u.username AS user_username, r.name AS recipe_name " +
      "FROM RecipeReview rr " +
      "JOIN User u ON rr.user_id = u.id " +
      "JOIN Recipe r ON rr.recipe_id = r.id " +
      "WHERE rr.id=?";
    const values = [id];

    const recipeReviewDetail = await executeQuery(query, values);

    if (recipeReviewDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "RecipeReview not found",
      });
    }

    res.json({
      status: 200,
      data: recipeReviewDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createRecipeReview = async (req, res, next) => {
  try {
    const { user_id, recipe_id, rating, description, date } = req.body;

    const query =
      "INSERT INTO RecipeReview (user_id, recipe_id, rating, description, date) VALUES (?, ?, ?, ?, ?)";
    const values = [user_id, recipe_id, rating, description, date];

    const createdRecipeReview = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdRecipeReview,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateRecipeReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, recipe_id, rating, description, date } = req.body;

    // Determine which field to update
    const updateFields = { user_id, recipe_id, rating, description, date };
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
    const query = `UPDATE RecipeReview SET ${setClause} WHERE id=?`;

    const updatedRecipeReview = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedRecipeReview,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM RecipeReview WHERE id=?";
    const values = [id];

    const deletedRecipeReview = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedRecipeReview,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
