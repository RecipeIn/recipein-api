import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Category Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  // Test for getCategory endpoint
  describe("GET /categories", () => {
    test("It should respond with an array of categories", async () => {
      const response = await request.get("/api/category"); // Adjust endpoint as necessary
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for different scenarios, like empty array, server errors, etc.
  });

  // Test for createCategory endpoint
  describe("POST /category", () => {
    test("It should create a new category and return the created category", async () => {
      const newCategory = {
        name: "Test Category",
        description: "A category for testing",
        image : "Image Test",
        image_background : "Image Background Test"
      };

      const response = await request.post("/api/category").send(newCategory);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created category
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  // Test for updateCategory endpoint
  describe("PUT /category/:id", () => {
    test("It should update an existing category and return the updated category", async () => {
      const updatedCategory = {
        name: "Updated Test Category",
        description: "Updated description",
        image: "updated_test_image_url",
        image_background : "Image Background Test"
      };

      const categoryId = 1; // Replace with an actual category ID from your database
      const response = await request
        .put(`/api/category/${categoryId}`)
        .send(updatedCategory);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated category
    });

    // Add more tests for scenarios like invalid data, updating a non-existent category, etc.
  });

  // describe("DELETE /category/:id", () => {
  //   test("It should delete an existing category and return a success message", async () => {
  //     const categoryId = 1; // Replace with an actual category ID from your database
  //     const response = await request.delete(`/api/category/${categoryId}`);
  //     expect(response.statusCode).toBe(200);
  //     expect(response.body).toHaveProperty("data");
  //     // Additional assertions to verify if the category was successfully deleted
  //   });

    // Add more tests for scenarios like deleting a non-existent category, etc.
  // });
  // Similarly, add describe blocks for getCategoryDetail, createCategory, updateCategory, and deleteCategory
});
