import request from "supertest";
import { app } from "../app";
import { getConnection } from "typeorm";

import createConnection from "../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });
  
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create a new user with existing email", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com"
    });

    expect(response.status).toBe(400);
  });
});
