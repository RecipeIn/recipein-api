import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Recipe Review Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /recipeReviews", () => {
    test("It should respond with an array of recipe reviews", async () => {
      const response = await request.get("/api/review");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for specific scenarios if needed
  });

  describe("POST /recipeReview", () => {
    test("It should create a new recipe review and return the created review", async () => {
      const newRecipeReview = {
        user_id: 1, // Replace with valid user ID
        recipe_id: 1, // Replace with valid recipe ID
        rating: 5,
        description: "Great recipe!",
        date: "2023-01-01", // Use appropriate date format
      };

      const response = await request.post("/api/review").send(newRecipeReview);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created review
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /recipeReview/:id", () => {
    test("It should update an existing recipe review and return the updated review", async () => {
      const updatedData = {
        rating: 4,
        description: "Updated review comment",
        // Add other fields you wish to update
      };

      const recipeReviewId = 1; // Replace with a valid review ID
      const response = await request
        .put(`/api/review/${recipeReviewId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated review
    });

    // Add more tests for scenarios like invalid data, updating a non-existent review, etc.
  });
});
