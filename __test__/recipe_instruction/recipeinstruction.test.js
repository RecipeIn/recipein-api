import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Recipe Instruction Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /recipeInstructions", () => {
    test("It should respond with an array of recipe instructions", async () => {
      const response = await request.get("/api/recipe-instruction");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });
  
    // Add more tests for specific scenarios if needed
  });
  
  describe("POST /recipeInstruction", () => {
    test("It should create a new recipe instruction and return the created entry", async () => {
      const newRecipeInstruction = {
        recipe_id: 2, // Replace with valid ID
        instruction_id: 2, // Replace with valid ID=

      };
  
      const response = await request.post("/api/recipe-instruction").send(newRecipeInstruction);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created recipe instruction
    });
  
    // Add more tests for scenarios like invalid data, missing fields, etc.
  });
  
  describe("PUT /recipeInstruction/:id", () => {
    test("It should update an existing recipe instruction and return the updated entry", async () => {
      const updatedData = {
        recipe_id: 2, // Update with new valid ID
        instruction_id: 2, // Update with new valid ID
        instruction_description: "Description Test"
      };
  
      const recipeInstructionId = 1; // Replace with a valid ID
      const response = await request.put(`/api/recipe-instruction/${recipeInstructionId}`).send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated recipe instruction
    });
  
    // Add more tests for scenarios like invalid data, updating a non-existent entry, etc.
  });
  

});

