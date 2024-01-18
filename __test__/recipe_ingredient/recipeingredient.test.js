import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Recipe Ingredient Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /recipeIngredients", () => {
    test("It should respond with an array of recipe ingredients", async () => {
      const response = await request.get("/api/recipe-ingredient");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for specific scenarios if needed
  });

  describe("POST /recipeIngredient", () => {
    test("It should create a new recipe ingredient and return the created entry", async () => {
      const newRecipeIngredient = {
        recipe_id: 1, // Replace with valid ID
        ingredient_id: 1, // Replace with valid ID
        unit_id: 2, // Replace with valid ID
        qty: 100,
      };

      const response = await request
        .post("/api/recipe-ingredient")
        .send(newRecipeIngredient);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created recipe ingredient
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /recipeIngredient/:id", () => {
    test("It should update an existing recipe ingredient and return the updated entry", async () => {
      const updatedData = {
        qty: 200, // Update the relevant fields
      };

      const recipeIngredientId = 2; // Replace with a valid ID
      const response = await request
        .put(`/api/recipe-ingredient/${recipeIngredientId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated recipe ingredient
    });

    // Add more tests for scenarios like invalid data, updating a non-existent entry, etc.
  });
});
