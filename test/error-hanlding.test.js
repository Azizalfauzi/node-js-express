import express from "express";
import request from "supertest";

const app = express();
const errorMiddlewaer = (err, req, res, next) => {
  res.status(500).send(`Terjadi error : ${err.message}`);
};

app.get("/", (req, res) => {
  throw new Error("Ups");
});
app.use(errorMiddlewaer);

test("Test Express error handling", async () => {
  let response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi error : Ups");
});
