import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}`);
});

test("Test Express Query param http", async () => {
  const response = await request(app).get("/").query({ name: "Aziz" });
  expect(response.text).toBe("Hello Aziz");
});
