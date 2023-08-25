import express from "express";
import request from "supertest";

const logger = (req, res, next) => {
  console.info(`Receive request ${req.method} ${req.originalUrl}`);
  next();
};

const addPoweredHeader = (req, res, next) => {
  res.set("X-Powered-By", "Aziz Alfauzi");
  next();
};

const app = express();

app.use(logger);
app.use(addPoweredHeader);

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/aziz", (req, res) => {
  res.send(`Hello Aziz`);
});

test("Test Express Middleware", async () => {
  let response = await request(app).get("/");
  expect(response.get("X-Powered-By")).toBe("Aziz Alfauzi");
  expect(response.text).toBe("Hello Response");
});

test("Test Express Middleware2", async () => {
  let response = await request(app).get("/aziz");
  expect(response.get("X-Powered-By")).toBe("Aziz Alfauzi");
  expect(response.text).toBe("Hello Aziz");
});
