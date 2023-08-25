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

const apiKeyMiddleWare = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
  }
};

const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const app = express();

app.use(logger);
app.use(apiKeyMiddleWare);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/aziz", (req, res) => {
  res.send(`Hello Aziz`);
});

app.get("/time", (req, res) => {
    res.send(`Hello , Today is ${req.requestTime}`);
});

test("Test Express Middleware", async () => {
  let response = await request(app).get("/").query({ apiKey: 123 });
  expect(response.get("X-Powered-By")).toBe("Aziz Alfauzi");
  expect(response.text).toBe("Hello Response");
});

test("Test Express Middleware Time", async () => {
  let response = await request(app).get("/time").query({ apiKey: 123 });
  expect(response.get("X-Powered-By")).toBe("Aziz Alfauzi");
  expect(response.text).toContain("Hello , Today is");
});

test("Test Express Middleware2", async () => {
  let response = await request(app).get("/aziz").query({ apiKey: 123 });
  expect(response.get("X-Powered-By")).toBe("Aziz Alfauzi");
  expect(response.text).toBe("Hello Aziz");
});

test("Test Express Middleware2 Unauthorized", async () => {
  let response = await request(app).get("/aziz");
  expect(response.status).toBe(401);
});
