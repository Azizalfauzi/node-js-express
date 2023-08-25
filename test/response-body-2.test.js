import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/contoh.txt");
});

test("Test Express response send file", async () => {
  let response = await request(app).get("/");
  expect(response.text).toBe("This is example");
});
