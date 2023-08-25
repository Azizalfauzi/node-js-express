import express from "express";
import request from "supertest";

const app = express();
// app.use(express.static(__dirname + "/static"));
app.use('/static',express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/contoh.txt", (req, res) => {
  res.send(`Hello Response`);
});

test("Test Express static file", async () => {
  let response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

test("Test Express static file contoh txt", async () => {
  let response = await request(app).get("/contoh.txt");
  expect(response.text).toContain("Hello Response");
});

test("Test Express static file contoh txt", async () => {
  let response = await request(app).get("/static/contoh.txt");
  expect(response.text).toContain("This is example");
});
