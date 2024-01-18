import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Nutrition Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /nutrition", () => {
    test("It should respond with an array of nutrition data", async () => {
      const response = await request.get("/api/nutrition");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });
  
    // Add more tests for specific scenarios if needed
  });

  describe("POST /nutrition", () => {
    test("It should create a new nutrition entry and return the created entry", async () => {
      const newNutrition = {
        description: "Test Nutrition Description",
      };
  
      const response = await request.post("/api/nutrition").send(newNutrition);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created nutrition
    });
  
    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /nutrition/:id", () => {
    test("It should update an existing nutrition entry and return the updated entry", async () => {
      const updatedData = {
        description: "Updated Nutrition Description",
      };
  
      const nutritionId = 1; // Replace with a valid nutrition ID
      const response = await request.put(`/api/nutrition/${nutritionId}`).send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated nutrition
    });
  
    // Add more tests for scenarios like invalid data, updating a non-existent nutrition, etc.
  });
});

