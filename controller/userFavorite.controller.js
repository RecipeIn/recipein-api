import { executeQuery } from "../lib/dbConnection.js";

export const getUserFavorite = async (req, res, next) => {
  try {
    const query =
      "SELECT uf.*, u.username AS user_username, r.name AS recipe_name " +
      "FROM UserFavorite uf " +
      "JOIN User u ON uf.user_id = u.id " +
      "JOIN Recipe r ON uf.recipe_id = r.id";

    const userFavorites = await executeQuery(query);

    res.json({
      status: 200,
      data: userFavorites,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUserFavoriteDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query =
      "SELECT uf.*, u.username AS user_username, r.name AS recipe_name " +
      "FROM UserFavorite uf " +
      "JOIN User u ON uf.user_id = u.id " +
      "JOIN Recipe r ON uf.recipe_id = r.id " +
      "WHERE uf.id=?";
    const values = [id];

    const userFavoriteDetail = await executeQuery(query, values);

    if (userFavoriteDetail.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "UserFavorite not found",
      });
    }

    res.json({
      status: 200,
      data: userFavoriteDetail[0],
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};


export const getUserFavoriteByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const query = "SELECT * FROM UserFavorite WHERE user_id=?";
    const values = [user_id];

    const userFavorites = await executeQuery(query, values);

    res.json({
      status: 200,
      data: userFavorites,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const getUserFavoriteByRecipeId = async (req, res, next) => {
  try {
    const { recipe_id } = req.params;

    const query = "SELECT * FROM UserFavorite WHERE recipe_id=?";
    const values = [recipe_id];

    const userFavorites = await executeQuery(query, values);

    res.json({
      status: 200,
      data: userFavorites,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const createUserFavorite = async (req, res, next) => {
  try {
    const { user_id, recipe_id } = req.body;

    const query =
      "INSERT INTO UserFavorite (user_id, recipe_id) VALUES (?, ?)";
    const values = [user_id, recipe_id];

    const createdUserFavorite = await executeQuery(query, values);

    res.status(201).json({
      status: 201,
      data: createdUserFavorite,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const updateUserFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id, recipe_id } = req.body;

    // Determine which field to update
    const updateFields = { user_id, recipe_id };
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
    const query = `UPDATE UserFavorite SET ${setClause} WHERE id=?`;

    const updatedUserFavorite = await executeQuery(query, values);

    res.json({
      status: 200,
      data: updatedUserFavorite,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

export const deleteUserFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = "DELETE FROM UserFavorite WHERE id=?";
    const values = [id];

    const deletedUserFavorite = await executeQuery(query, values);

    res.json({
      status: 200,
      data: deletedUserFavorite,
    });
  } catch (error) {
    next(new Error(`Error: ${error.message}`));
  }
};

