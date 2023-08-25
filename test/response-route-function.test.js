import express from "express";
import request from "supertest";

const app = express();

app
  .route("/products")
  .get((req, res) => {
    res.send("Get Products");
  })
  .post((req, res) => {
    res.send("Post Products");
  })
  .put((req, res) => {
    res.send("Put Products");
  });

test("Test Express route parameter", async () => {
  let response = await request(app).get("/products");
  expect(response.text).toBe("Get Products");

  response = await request(app).post("/products");
  expect(response.text).toBe("Post Products");

  response = await request(app).put("/products");
  expect(response.text).toBe("Put Products");
});
