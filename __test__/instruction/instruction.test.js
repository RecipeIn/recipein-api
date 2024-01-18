import supertest from "supertest";
import server from "../../lib/testServer";

const app = server();

describe("Instruction Endpoint Tests", () => {
  let request;
  beforeEach(() => {
    request = supertest(app);
  });

  describe("GET /instructions", () => {
    test("It should respond with an array of instructions", async () => {
      const response = await request.get("/api/instruction");
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      expect(Array.isArray(response.body.data)).toBeTruthy();
    });

    // Add more tests for specific scenarios if needed
  });

  describe("POST /instruction", () => {
    test("It should create a new instruction and return the created instruction", async () => {
      const newInstruction = {
        description: "Test Instruction Description",
      };

      const response = await request
        .post("/api/instruction")
        .send(newInstruction);
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the created instruction
    });

    // Add more tests for scenarios like invalid data, missing fields, etc.
  });

  describe("PUT /instruction/:id", () => {
    test("It should update an existing instruction and return the updated instruction", async () => {
      const updatedData = {
        description: "Updated Instruction Description",
      };

      const instructionId = 1; // Replace with a valid instruction ID
      const response = await request
        .put(`/api/instruction/${instructionId}`)
        .send(updatedData);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("data");
      // Additional assertions to verify the contents of the updated instruction
    });

    // Add more tests for scenarios like invalid data, updating a non-existent instruction, etc.
  });
});
