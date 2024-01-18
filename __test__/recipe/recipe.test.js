import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Recipe Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /recipes", () => {
    test("It should respond with an array of recipes", async () => {
      const response = await request.get("/api/recipe");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for edge cases, like empty array, server errors, etc.
  });

  describe("POST /recipe", () => {
    test("It should create a new recipe and return the created recipe", async () => {
      const newRecipe = {
        user_id: 1, // Replace with a valid user ID
        category_id: 1, // Replace with a valid category ID
        name: "Test Recipe",
        description: "This is a test recipe",
        rating: 5,
        status: "published",
        image: "test_image_url",
        preparation_time: 30,
        cooking_time: 15,
      };

      const response = await request.post("/api/recipe").send(newRecipe);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created recipe
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /recipe/:id", () => {
    test("It should update an existing recipe and return the updated recipe", async () => {
      const updatedRecipeData = {
        name: "Updated Recipe Name",
        description: "Updated description",
        rating: 4,
        status: "updated_status",
        image: "updated_image_url",
        user_id: 1, // Replace with a valid user ID
        category_id: 1, // Replace with a valid category ID
        preparation_time: 35,
        cooking_time: 20,
      };

      const recipeId = 1; // Replace with an actual recipe ID
      const response = await request
        .put(`/api/recipe/${recipeId}`)
        .send(updatedRecipeData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated recipe
    });

    // Add more tests for scenarios like invalid data, updating a non-existent recipe, etc.
  });
});
