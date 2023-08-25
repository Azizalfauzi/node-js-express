import express from "express";
import request from "supertest";

const router = express.Router();
const app = express();

router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});

router.get("/feature/a", (req, res) => {
  res.send("feature a");
});

test("Test Express router disabled", async () => {
  let response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

test("Test Express router enabled", async () => {
  app.use(router);
  let response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
});
