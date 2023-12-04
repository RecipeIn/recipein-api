import bcrypt from "bcrypt";
import { createHash } from "crypto";
import { validationResult, matchedData } from "express-validator";
import { generateToken, verifyToken } from "../lib/tokenHandler.js";
import { prisma } from "../lib/dbConnection.js";

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

// If email already exists in database
// export const fetchUserByEmailOrID = async (data, isEmail = true) => {
//   try {
//     let user;

//     if (isEmail) {
//       // Fetch user by email
//       user = await prisma.user.findUnique({
//         where: {
//           email: data,
//         },
//         select: {
//           id: true,
//           username: true,
//           email: true,
//         },
//       });
//     } else {
//       // Fetch user by ID
//       user = await prisma.user.findUnique({
//         where: {
//           id: parseInt(data),
//         },
//         select: {
//           id: true,
//           username: true,
//           email: true,
//         },
//       });
//     }

//     return user;
//   } catch (error) {
//     // Handle errors, log them, or throw a custom error
//     console.error("Error fetching user:", error);
//     throw new Error("Failed to fetch user");
//   }
// };

export default {
  signup: async (req, res, next) => {
    try {
      const { username, email, password } = req.body;

      const existingUsers = await prisma.user.findFirst({
        where: { email: email },
      });

      if (existingUsers) {
        return res.status(400).json({
          status: 400,
          message: "Email sudah terpakai.",
        });
      } else {
        const saltRounds = 10;
        // Hash the password
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Store user data in the database
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashPassword,
          },
          select: {
            id: true,
          },
        });

        res.status(201).json({
          status: 201,
          message: "You have been successfully registered.",
          user_id: user.id,
        });
      }
    } catch (err) {
      next(err);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Fetch user by email
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

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

        const existingRefreshToken = await prisma.refreshToken.findUnique({
          where: { user_id: user.id },
        });
        if (existingRefreshToken) {
          // Update existing refresh token
          const updatedRefreshToken = await prisma.refreshToken.update({
            where: { user_id: user.id },
            data: { token: md5Refresh },
          });

          res.json({
            status: 200,
            user_id: user.id,
            access_token,
            refresh_token: refresh_token,
            refresh_token_md5: updatedRefreshToken.token,
          });
        } else {
          // Create new refresh token
          const createdRefreshToken = await prisma.refreshToken.create({
            data: {
              token: md5Refresh,
              user: { connect: { id: user.id } },
            },
          });

          res.json({
            status: 200,
            user_id: user.id,
            access_token,
            refresh_token: refresh_token,
            refresh_token_md5: createdRefreshToken.token,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    try {
      // Verify the access token
      const data = verifyToken(req.headers.access_token);
      if (data?.status) return res.status(data.status).json(data);

      // Fetch user by ID
      const user = await prisma.user.findUnique({
        where: {
          id: data.id,
        },
      });

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
      // Verify the refresh token
      const data = verifyToken(refreshToken, false);
      if (data?.status) return res.status(data.status).json(data);

      const md5Refresh = createHash("md5").update(refreshToken).digest("hex");
      // Find the refresh token in the database
      const refreshTokenRecord = await prisma.refreshToken.findFirst({
        where: {
          token: md5Refresh,
        },
      });

      if (!refreshTokenRecord) {
        return res.json({
          status: 401,
          message: "Unauthorized: Invalid Refresh Token.",
        });
      }

      // Generating new access and refresh token
      const access_token = generateToken({ id: data.id });
      const refresh_token = generateToken({ id: data.id }, false);

      const md5RefreshUpdate = createHash("md5")
        .update(refresh_token)
        .digest("hex");

      // Update the refresh token in the database
      await prisma.refreshToken.update({
        where: {
          user_id: refreshTokenRecord.user_id,
        },
        data: {
          token: md5RefreshUpdate,
        },
      });

      res.json({
        status: 200,
        access_token,
        refresh_token,
      });
    } catch (err) {
      next(err);
    }
  },
};
