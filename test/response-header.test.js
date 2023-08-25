import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "Zuhaha",
    "X-Author": "Aziz Alfa",
  });
  res.send(`Hello response`);
});

test("Test Express response header", async () => {
  let response = await request(app).get("/");
  expect(response.text).toBe("Hello response");
  expect(response.get("X-Powered-By")).toBe("Zuhaha");
  expect(response.get("X-Author")).toBe("Aziz Alfa");
});
