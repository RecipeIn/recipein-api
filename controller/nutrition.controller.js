import { executeQuery } from "../lib/dbConnection.js";
export * as nutritionController from "./nutrition.controller.js";

export const getNutrition = async (req, res, next) => {
  try {
    const query = "SELECT * FROM Nutrition";
    const nutritions = await executeQuery(query);

    res.json({
      status: 200,
      data: nutritions,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createNutrition = async (req, res, next) => {
  try {
    const { description } = req.body;

    const query = "INSERT INTO Nutrition (description) VALUES (?)";
    const values = [description];

    const createdNutrition = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const query = "UPDATE Nutrition SET description=? WHERE id=?";
    const values = [description, id];

    const updatedNutrition = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteNutrition = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM Nutrition WHERE id=?";
    const values = [id];

    const deletedNutrition = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedNutrition,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getNutritionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM Nutrition WHERE id=?";
    const values = [id];

    const nutritionDetail = await executeQuery(query, values);

    if (nutritionDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Nutrition not found",
      });
    }

    res.json({
      status: 200,
      data: nutritionDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
