import { Router } from "express";
import { body, header } from "express-validator";
import controller, { validate } from "../controller/auth.controller.js";
import { recipeController } from "../controller/recipe.controller.js";
import { categoryController } from "../controller/category.controller.js";
import { unitController } from "../controller/unit.controller.js";
import { ingredientController } from "../controller/ingredient.controller.js";
import {
  createUserFavorite,
  deleteUserFavorite,
  getUserFavorite,
  getUserFavoriteByRecipeId,
  getUserFavoriteByUserId,
  updateUserFavorite,
} from "../controller/userFavorite.controller.js";
import { recipeReviewController } from "../controller/recipeReview.controller.js";
import { userNutritionController } from "../controller/userNutrition.controller.js";
import { nutritionController } from "../controller/nutrition.controller.js";
import { instructionController } from "../controller/instruction.controller.js";
import { recipeIngredientController } from "../controller/recipeIngredient.controller.js";
import { recipeInstructionController } from "../controller/recipeInstruction.controller.js";

const routes = Router({ strict: true });

// Token Validation Rule
const tokenValidation = (isRefresh = false) => {
  let refreshText = isRefresh ? "Refresh" : "Authorization";

  return [
    header("Authorization", `Please provide your ${refreshText} token`)
      .exists()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        if (!value.startsWith("Bearer") || !value.split(" ")[1]) {
          throw new Error(`Invalid ${refreshText} token`);
        }
        if (isRefresh) {
          req.headers.refresh_token = value.split(" ")[1];
          return true;
        }
        req.headers.access_token = value.split(" ")[1];
        return true;
      }),
  ];
};

// Register a new User
routes.post(
  "/signup",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name must not be empty.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .escape(),
    body("email", "Invalid email address.")
      .trim()
      .isEmail()
      .custom(async (email) => {
        const isExist = await fetchUserByEmailOrID(email);
        if (isExist.length)
          throw new Error("A user already exists with this e-mail address");
        return true;
      }),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters long"),
  ],
  // validate,
  controller.signup
);

// Login user through email and password
routes.post(
  "/login",
  // validate,
  controller.login
);

// Get the user data by providing the access token
routes.get("/profile", tokenValidation(), validate, controller.getUser);

// Get new access and refresh token by providing the refresh token
routes.get(
  "/refresh",
  tokenValidation(true),
  validate,
  controller.refreshToken
);

//recipe
routes.get("/recipe", recipeController.getRecipe);
routes.post("/recipe", recipeController.createRecipe);
routes.put("/recipe/:id", recipeController.updateRecipe);
routes.delete("/recipe/:id", recipeController.deleteRecipe);

//category
routes.get("/category", categoryController.getCategory);
routes.post("/category", categoryController.createCategory);
routes.put("/category/:id", categoryController.updateCategory);
routes.delete("/category/:id", categoryController.deleteCategory);

//unit
routes.get("/unit", unitController.getUnit);
routes.post("/unit", unitController.createUnit);
routes.put("/unit/:id", unitController.updateUnit);
routes.delete("/unit/:id", unitController.deleteUnit);

//recipeingredient
routes.get("/recipeingredient", recipeIngredientController.getRecipeIngredient);
routes.post(
  "/recipeingredient",
  recipeIngredientController.createRecipeIngredient
);
routes.put(
  "/recipeingredient/:id",
  recipeIngredientController.updateRecipeIngredient
);
routes.delete(
  "/recipeingredient/:id",
  recipeIngredientController.deleteRecipeIngredient
);

//ingredient
routes.get("/ingredient", ingredientController.getIngredient);
routes.post("/ingredient", ingredientController.createIngredient);
routes.put("/ingredient/:id", ingredientController.updateIngredient);
routes.delete("/ingredient/:id", ingredientController.deleteIngredient);

//userfavorite
routes.get("/favorite", getUserFavorite);
routes.post("/favorite", createUserFavorite);
routes.put("/favorite/:id", updateUserFavorite);
routes.delete("/favorite/:id", deleteUserFavorite);
routes.get("/favorite/user/:user_id", getUserFavoriteByUserId);
routes.get("/favorite/recipe/:recipe_id", getUserFavoriteByRecipeId);

//recipereview
routes.get("/review", recipeReviewController.getRecipeReview);
routes.post("/review", recipeReviewController.createRecipeReview);
routes.put("/review/:id", recipeReviewController.updateRecipeReview);
routes.delete("/review/:id", recipeReviewController.deleteRecipeReview);

//usernutrition
routes.get("/user-nutrition", userNutritionController.getUserNutrition);
routes.post("/user-nutrition", userNutritionController.createUserNutrition);
routes.put("/user-nutrition/:id", userNutritionController.updateUserNutrition);
routes.delete(
  "/user-nutrition/:id",
  userNutritionController.deleteUserNutrition
);
routes.get(
  "/user-nutrition/user/:user_id",
  userNutritionController.getUserNutritionByUserId
);

//nutrition
routes.get("/nutrition", nutritionController.getNutrition);
routes.post("/nutrition", nutritionController.createNutrition);
routes.put("/nutrition/:id", nutritionController.updateNutrition);
routes.delete("/nutrition/:id", nutritionController.deleteNutrition);

//instruction
routes.get("/instruction", instructionController.getInstruction);
routes.post("/instruction", instructionController.createInstruction);
routes.put("/instruction/:id", instructionController.updateInstruction);
routes.delete("/instruction/:id", instructionController.deleteInstruction);

//recipeinstruction
routes.get(
  "/recipe-instruction",
  recipeInstructionController.getRecipeInstruction
);
routes.post(
  "/recipe-instruction",
  recipeInstructionController.createRecipeInstruction
);
routes.put(
  "/recipe-instruction/:id",
  recipeInstructionController.updateRecipeInstruction
);
routes.delete(
  "/recipe-instruction/:id",
  recipeInstructionController.deleteRecipeInstruction
);

export default routes;
