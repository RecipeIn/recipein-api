import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("User Favorite Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /userFavorites", () => {
    test("It should respond with an array of user favorites", async () => {
      const response = await request.get("/api/favorite");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Additional tests can be written for specific scenarios
  });

  describe("POST /userFavorite", () => {
    test("It should create a new user favorite and return the created entity", async () => {
      const newUserFavorite = {
        user_id: 1, // Replace with valid user ID
        recipe_id: 1, // Replace with valid recipe ID
      };

      const response = await request
        .post("/api/favorite")
        .send(newUserFavorite);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to check the response content
    });

    // More tests for invalid data or missing fields
  });

  describe("PUT /userFavorite/:id", () => {
    test("It should update an existing user favorite and return the updated entity", async () => {
      const updatedUserFavorite = {
        user_id: 2, // New user ID
        recipe_id: 2, // New recipe ID
      };

      const userFavoriteId = 1; // Existing user favorite ID
      const response = await request
        .put(`/api/favorite/${userFavoriteId}`)
        .send(updatedUserFavorite);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Verify the updated entity in the response
    });

    // Additional tests for scenarios like invalid data or non-existent IDs
  });
});
