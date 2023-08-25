import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  let name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Express cookies read", async () => {
  let response = await request(app)
    .get("/")
    .set("Cookie", "name=Aziz;author=Alfa");
  expect(response.text).toBe("Hello Aziz");
});

test("Test Express cookies write", async () => {
  let response = await request(app).post("/login").send({ name: "Aziz" });
  expect(response.get("Set-Cookie").toString()).toBe("Login=Aziz; Path=/");
  expect(response.text).toBe("Hello Aziz");
});
