import { executeQuery } from "../lib/dbConnection.js";
export * as userNutritionController from "./userNutrition.controller.js";

export const getUserNutrition = async (req, res, next) => {
  try {
    const query =
      "SELECT un.*, u.username AS user_username " +
      "FROM UserNutrition un " +
      "JOIN User u ON un.user_id = u.id";

    const userNutrition = await executeQuery(query);

    res.json({
      status: 200,
      data: userNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUserNutritionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT un.*, u.username AS user_username " +
      "FROM UserNutrition un " +
      "JOIN User u ON un.user_id = u.id " +
      "WHERE un.id=?";
    const values = [id];

    const userNutritionDetail = await executeQuery(query, values);

    if (userNutritionDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "UserNutrition not found",
      });
    }

    res.json({
      status: 200,
      data: userNutritionDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUserNutritionByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const query = "SELECT * FROM UserNutrition WHERE user_id=?";
    const values = [user_id];

    const userNutrition = await executeQuery(query, values);

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

    const query =
      "INSERT INTO UserNutrition (user_id, calories, protein, carbohydrate, vitamin, fiber, fat) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [
      user_id,
      calories,
      protein,
      carbohydrate,
      vitamin,
      fiber,
      fat,
    ];

    const createdUserNutrition = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdUserNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateUserNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, calories, protein, carbohydrate, vitamin, fiber, fat } =
      req.body;

    // Determine which field to update
    const updateFields = {
      user_id,
      calories,
      protein,
      carbohydrate,
      vitamin,
      fiber,
      fat,
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
    const query = `UPDATE UserNutrition SET ${setClause} WHERE id=?`;

    const updatedUserNutrition = await executeQuery(query, values);

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

    const query = "DELETE FROM UserNutrition WHERE id=?";
    const values = [id];

    const deletedUserNutrition = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedUserNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
