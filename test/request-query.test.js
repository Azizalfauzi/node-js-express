import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test("Test Express Query", async () => {
  const response = await request(app)
    .get("/")
    .query({ firstName: "Aziz", lastName: "Alfa" });
  expect(response.text).toBe("Hello Aziz Alfa");
});
