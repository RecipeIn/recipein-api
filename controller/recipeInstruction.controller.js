import { executeQuery } from "../lib/dbConnection.js";
export * as recipeInstructionController from "./recipeInstruction.controller.js";

export const getRecipeInstruction = async (req, res, next) => {
  try {
    const query =
      "SELECT ri.*, i.description AS instruction_description FROM RecipeInstruction ri " +
      "JOIN Instruction i ON ri.instruction_id = i.id";

    const recipeInstructions = await executeQuery(query);

    res.json({
      status: 200,
      data: recipeInstructions,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getRecipeInstructionDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT ri.*, i.description AS instruction_description FROM RecipeInstruction ri " +
      "JOIN Instruction i ON ri.instruction_id = i.id " +
      "WHERE ri.id=?";
    const values = [id];

    const recipeInstructionDetail = await executeQuery(query, values);

    if (recipeInstructionDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "RecipeInstruction not found",
      });
    }

    res.json({
      status: 200,
      data: recipeInstructionDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createRecipeInstruction = async (req, res, next) => {
  try {
    const { recipe_id, instruction_id } = req.body;

    const query =
      "INSERT INTO RecipeInstruction (recipe_id, instruction_id) VALUES (?, ?)";
    const values = [recipe_id, instruction_id];

    const createdRecipeInstruction = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdRecipeInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateRecipeInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { recipe_id, instruction_id } = req.body;

    // Determine which field to update
    const updateFields = { recipe_id, instruction_id };
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
    const query = `UPDATE RecipeInstruction SET ${setClause} WHERE id=?`;

    const updatedRecipeInstruction = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedRecipeInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteRecipeInstruction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM RecipeInstruction WHERE id=?";
    const values = [id];

    const deletedRecipeInstruction = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedRecipeInstruction,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
