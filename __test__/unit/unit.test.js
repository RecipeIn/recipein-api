import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Unit Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /units", () => {
    test("It should respond with an array of units", async () => {
      const response = await request.get("/api/unit");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for specific scenarios if needed
  });

  describe("POST /unit", () => {
    test("It should create a new unit and return the created unit", async () => {
      const newUnit = {
        name: "Test Unit",
      };

      const response = await request.post("/api/unit").send(newUnit);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created unit
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /unit/:id", () => {
    test("It should update an existing unit and return the updated unit", async () => {
      const updatedData = {
        name: "Updated Unit Name",
      };

      const unitId = 1; // Replace with a valid unit ID
      const response = await request
        .put(`/api/unit/${unitId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated unit
    });

    // Add more tests for scenarios like invalid data, updating a non-existent unit, etc.
  });
});
