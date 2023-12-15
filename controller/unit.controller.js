import { executeQuery } from "../lib/dbConnection.js";
export * as unitController from "./unit.controller.js";

export const getUnit = async (req, res, next) => {
  try {
    const query = "SELECT * FROM Unit";
    const units = await executeQuery(query);

    res.json({
      status: 200,
      data: units,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUnitDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "SELECT * FROM Unit WHERE id=?";
    const values = [id];

    const unitDetail = await executeQuery(query, values);

    if (unitDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Unit not found",
      });
    }

    res.json({
      status: 200,
      data: unitDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};


export const createUnit = async (req, res, next) => {
  try {
    const { name } = req.body;

    const query = "INSERT INTO Unit (name) VALUES (?)";
    const values = [name];

    const createdUnit = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdUnit,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const query = "UPDATE Unit SET name=? WHERE id=?";
    const values = [name, id];

    const updatedUnit = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedUnit,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM Unit WHERE id=?";
    const values = [id];

    const deletedUnit = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedUnit,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};
