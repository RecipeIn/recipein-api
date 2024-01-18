import supertest from "supertest";
// const supertest = require("supertest");
// const server = require("../../lib/testServer");

import server from "../../lib/testServer";

const app = server();

// describe("POST User Authentication (/auth)", () => {
//   describe("Creating  User Account (/signup)", () => {
//     // change email if want to run again
//     it("should return 201", async () => {
//       const account = {
//         name: "Jest Test Account",
//         email: "jesttest6@gmail.com",
//         password: "jest123",
//       };

//       await supertest(app).post("/auth/signup").send(account).expect(201);
//     });
//   });
// });

// describe("Creating User Account with Exist Email (/signup)", () => {
//   it("should return 400", async () => {
//     const accountDetail = {
//       username: "Jest Test Account",
//       email: "jesttest7@gmail.com",
//       password: "jest123",
//     };

//     await supertest(app).post("/auth/signup").send(accountDetail).expect(201);
//   });
// });

describe("Login User Account (/login)", () => {
  it("should return 200", async () => {
    const accountDetail = {
      email: "jesttest7@gmail.com",
      password: "jest123",
    };

    await supertest(app).post("/auth/login").send(accountDetail).expect(200);
  });
});

describe("Login User Account where password incorrect (/login)", () => {
  it("should return 422", async () => {
    const accountDetail = {
      email: "jesttest7@gmail.com",
      password: "1234424132",
    };

    await supertest(app).post("/auth/login").send(accountDetail).expect(422);
  });
});
