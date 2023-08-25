import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/zuha", (req, res) => {
  res.send("Hello Zuha");
});

app.listen(3000, () => {
  console.info("Server in started in 3000");
});
