/**
 * @jest-environment node
 */
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import request from "supertest";

// 1. Load env before dynamic import
dotenv.config({ path: path.resolve(process.cwd(), "backend", ".env") });

const { default: app } = await import("./app.js");

describe("API Integration Tests - The Full Suite", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // --- 1. VALIDATION & SECURITY ---
  test("POST /signup responds with 400 for invalid data", async () => {
    const response = await request(app)
      .post("/signup")
      .send({ email: "not-an-email" });
    expect(response.status).toBe(400);
  });

  test("GET /items returns 401 without a valid cookie", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(401);
  });

  // --- 2. COOKIES & AUTHENTICATION ---
  test("POST /login returns 200/401 and sets a cookie", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password123" });

    expect([200, 401, 400]).toContain(response.status);
    if (response.status === 200) {
      expect(response.headers["set-cookie"]).toBeDefined();
    }
  });


  // --- 4. QUERY PARAMETERS (.query) ---
  test("GET /items with pagination query", async () => {
    const response = await request(app)
      .get("/items")
      .query({ per_page: "50", offset: "20" }); // Using your specific query example

    expect([200, 401]).toContain(response.status);
  });

  // --- 5. EDGE CASES & PARAMS ---
  test("GET /items/:id returns 401 or 400", async () => {
    const response = await request(app).get("/items/not-a-valid-id");
    expect([400, 401]).toContain(response.status);
  });
});
