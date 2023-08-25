import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  if (req.query.name) {
    res.status(200);
    res.send(`Request ${req.query.name}`);
  } else {
    res.status(400);
    res.end();
  }
});

test("Test Express response status", async () => {
  let response = await request(app).get("/").query({ name: "Aziz" });
  expect(response.status).toBe(200);
  expect(response.text).toBe("Request Aziz");

  response = await request(app).get("/");
  expect(response.status).toBe(400);
});
