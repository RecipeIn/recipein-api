import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("User Nutrution Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /userNutrition", () => {
    test("It should respond with an array of user nutrition data", async () => {
      const response = await request.get("/api/user-nutrition");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Additional tests can be written for specific scenarios
  });

  describe("POST /userNutrition", () => {
    test("It should create new user nutrition data and return the created data", async () => {
      const newUserNutrition = {
        user_id: 3, // Replace with valid user ID
        calories: 2000,
        protein: 50,
        carbohydrate: 250,
        vitamin: 12,
        fiber: 30,
        fat: 70,
      };

      const response = await request
        .post("/api/user-nutrition")
        .send(newUserNutrition);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to check the response content
    });

    // More tests for invalid data or missing fields
  });

  describe("PUT /userNutrition/:id", () => {
    test("It should update an existing user nutrition entry and return the updated entry", async () => {
      const updatedData = {
        calories: 2200,
        protein: 55,
        // Add other fields you wish to update
      };

      const userNutritionId = 1; // Replace with a valid ID
      const response = await request
        .put(`/api/user-nutrition/${userNutritionId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated user nutrition
    });

    // Add more tests for scenarios like invalid data,
  });
});
