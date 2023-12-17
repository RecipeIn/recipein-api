export * as ingredientController from "./ingredient.controller.js";
import { executeQuery } from "../lib/dbConnection.js";

export const getIngredient = async (req, res, next) => {
  try {
    const query = "SELECT * FROM Ingredient";
    const ingredients = await executeQuery(query);

    res.json({
      status: 200,
      data: ingredients,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createIngredient = async (req, res, next) => {
  try {
    const { name } = req.body;

    const query = "INSERT INTO Ingredient (name) VALUES (?)";
    const values = [name];

    const createdIngredient = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const query = "UPDATE Ingredient SET name=? WHERE id=?";
    const values = [name, id];

    const updatedIngredient = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM Ingredient WHERE id=?";
    const values = [id];

    const deletedIngredient = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedIngredient,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getIngredientDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM Ingredient WHERE id=?";
    const values = [id];

    const ingredientDetail = await executeQuery(query, values);

    if (ingredientDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Ingredient not found",
      });
    }

    res.json({
      status: 200,
      data: ingredientDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
