import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Ingredient Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /ingredients", () => {
    test("It should respond with an array of ingredients", async () => {
      const response = await request.get("/api/ingredient");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for specific scenarios like an empty array, server errors, etc.
  });

  describe("GET /ingredient/:id", () => {
    test("It should respond with details of a specific ingredient", async () => {
      const ingredientId = 1; // Replace with a valid ingredient ID
      const response = await request.get(`/api/ingredient/${ingredientId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Assertions to check the details of the ingredient
    });

    // Add more tests for non-existent ingredient, etc.
  });
  describe("PUT /ingredient/:id", () => {
    test("It should update an existing ingredient and return the updated ingredient", async () => {
      const updatedData = {
        name: "Updated Ingredient Name",
      };

      const ingredientId = 1; // Replace with a valid ingredient ID
      const response = await request
        .put(`/api/ingredient/${ingredientId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated ingredient
    });

    // Add more tests for scenarios like invalid data, updating a non-existent ingredient, etc.
  });
});
