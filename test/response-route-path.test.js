import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test Express route path", async () => {
  let response = await request(app).get("/products/aziz.json");
  expect(response.text).toBe("/products/aziz.json");

  response = await request(app).get("/products/zuha.json");
  expect(response.text).toBe("/products/zuha.json");

  response = await request(app).get("/categories/1234.json");
  expect(response.text).toBe("/categories/1234.json");

  response = await request(app).get("/categories/salah.json");
  expect(response.status).toBe(404);
});
