import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/to-next-page");
});

test("Test Express response redirect", async () => {
  let response = await request(app).get("/");
  expect(response.status).toBe(302);
  expect(response.get("Location")).toBe("/to-next-page");
});
