import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("SECRETRAHASIA"));
app.use(express.json());

app.get("/", (req, res) => {
  let name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Express cookies read", async () => {
  let response = await request(app)
    .get("/")
    .set("Cookie", "Login=s%3AAziz.JjVeYp7pVg7md4nxy6TKvwC%2FgJt5m%2BFk0zmggCj7a8o; Path=/");
  expect(response.text).toBe("Hello Aziz");
});

test("Test Express cookies write", async () => {
  let response = await request(app).post("/login").send({ name: "Aziz" });
  console.info(response.get("Set-Cookie").toString());
  expect(response.get("Set-Cookie").toString()).toContain("Aziz");
  expect(response.text).toBe("Hello Aziz");
});
