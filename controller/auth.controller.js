import bcrypt from "bcrypt";
import { createHash } from "crypto";
import { validationResult } from "express-validator";
import { generateToken, verifyToken } from "../lib/tokenHandler.js";
import { executeQuery } from "../lib/dbConnection.js";

const validation_result = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

export const validate = (req, res, next) => {
  const errors = validation_result(req).mapped();
  if (Object.keys(errors).length) {
    return res.status(422).json({
      status: 422,
      errors,
    });
  }
  next();
};

export default {
  signup: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const existingUserQuery = "SELECT * FROM User WHERE email = ?";
      const existingUsers = await executeQuery(existingUserQuery, [email]);

      if (existingUsers.length > 0) {
        return res.status(400).json({
          status: 400,
          message: "Email sudah terpakai.",
        });
      } else {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const createUserQuery =
          "INSERT INTO User (username, email, password) VALUES (?, ?, ?)";
        const result = await executeQuery(createUserQuery, [
          username,
          email,
          hashPassword,
        ]);

        res.status(201).json({
          status: 201,
          message: "You have been successfully registered.",
          user_id: result.insertId,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const getUserQuery = "SELECT * FROM User WHERE email = ?";
      const userResults = await executeQuery(getUserQuery, [email]);
      const user = userResults[0];

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "Pengguna tidak ditemukan",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(422).json({
          status: 422,
          message: "Password salah!",
        });
      } else {
        const access_token = generateToken({ id: user.id });
        const refresh_token = generateToken({ id: user.id }, false);
        const md5Refresh = createHash("md5")
          .update(refresh_token)
          .digest("hex");

        const getRefreshTokenQuery =
          "SELECT * FROM RefreshToken WHERE user_id = ?";
        const existingRefreshToken = await executeQuery(getRefreshTokenQuery, [
          user.id,
        ]);

        if (existingRefreshToken.length > 0) {
          // Update existing refresh token
          const updateRefreshTokenQuery =
            "UPDATE RefreshToken SET token = ? WHERE user_id = ?";
          await executeQuery(updateRefreshTokenQuery, [md5Refresh, user.id]);

          res.json({
            status: 200,
            user_id: user.id,
            access_token,
            refresh_token: refresh_token,
            refresh_token_md5: md5Refresh,
          });
        } else {
          // Create new refresh token
          const createRefreshTokenQuery =
            "INSERT INTO RefreshToken (token, user_id) VALUES (?, ?)";
          await executeQuery(createRefreshTokenQuery, [md5Refresh, user.id]);

          res.json({
            status: 200,
            user_id: user.id,
            access_token,
            refresh_token: refresh_token,
            refresh_token_md5: md5Refresh,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const data = verifyToken(req.headers.access_token);
      if (data?.status) return res.status(data.status).json(data);

      const getUserQuery = "SELECT * FROM User WHERE id = ?";
      const userResults = await executeQuery(getUserQuery, [data.id]);
      const user = userResults[0];

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      res.json({
        status: 200,
        user,
      });
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const refreshToken = req.headers.refresh_token;
      const data = verifyToken(refreshToken, false);
      if (data?.status) return res.status(data.status).json(data);

      const md5Refresh = createHash("md5").update(refreshToken).digest("hex");
      const findRefreshTokenQuery =
        "SELECT * FROM RefreshToken WHERE token = ?";
      const refreshTokenRecord = await executeQuery(findRefreshTokenQuery, [
        md5Refresh,
      ]);

      if (!refreshTokenRecord.length > 0) {
        return res.json({
          status: 401,
          message: "Unauthorized: Invalid Refresh Token.",
        });
      }

      const access_token = generateToken({ id: data.id });
      const refresh_token = generateToken({ id: data.id }, false);
      const md5RefreshUpdate = createHash("md5")
        .update(refresh_token)
        .digest("hex");

      const updateRefreshTokenQuery =
        "UPDATE RefreshToken SET token = ? WHERE user_id = ?";
      await executeQuery(updateRefreshTokenQuery, [
        md5RefreshUpdate,
        refreshTokenRecord[0].user_id,
      ]);

      res.json({
        status: 200,
        access_token,
        refresh_token,
      });
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { currentPassword, newPassword } = req.body;

      const data = verifyToken(req.headers.access_token);
      if (data?.status) return res.status(data.status).json(data);

      const getUserQuery = "SELECT * FROM User WHERE id = ?";
      const userResults = await executeQuery(getUserQuery, [data.id]);
      const user = userResults[0];

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!passwordMatch) {
        return res.status(422).json({
          status: 422,
          message: "Current password is incorrect.",
        });
      }

      const saltRounds = 10;
      const hashPassword = await bcrypt.hash(newPassword, saltRounds);

      const updatePasswordQuery = "UPDATE User SET password = ? WHERE id = ?";
      await executeQuery(updatePasswordQuery, [hashPassword, user.id]);

      res.json({
        status: 200,
        message: "Password updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const {
        username,
        email,
        first_name,
        last_name,
        gender,
        age,
        height,
        weight,
        activity,
        avatar,
      } = req.body;

      const data = verifyToken(req.headers.access_token);
      if (data?.status) return res.status(data.status).json(data);

      const getUserQuery = "SELECT * FROM User WHERE id = ?";
      const userResults = await executeQuery(getUserQuery, [data.id]);
      const user = userResults[0];

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      // Check if the provided email is already used by another user
      if (email && email !== user.email) {
        const existingUserQuery = "SELECT * FROM User WHERE email = ?";
        const existingUsers = await executeQuery(existingUserQuery, [email]);

        if (existingUsers.length > 0) {
          return res.status(400).json({
            status: 400,
            message: "Email sudah terpakai.",
          });
        }
      }

      // Update the user profile
      const updateProfileQuery =
        "UPDATE User SET username = ?, email = ?, first_name = ?, last_name = ?, gender = ?, age = ?, height = ?, weight = ?, activity = ?, avatar = ? WHERE id = ?";
      await executeQuery(updateProfileQuery, [
        username,
        email,
        first_name,
        last_name,
        gender,
        age,
        height,
        weight,
        activity,
        avatar,
        user.id,
      ]);

      res.json({
        status: 200,
        message: "Profile updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  },
};
