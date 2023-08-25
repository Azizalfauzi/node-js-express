import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product ${idProduct}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const idCategory = req.params.id;
  res.send(`Categories ${idCategory}`);
});

app.get("/seller/:idSeller/products/:idProducts", (req, res) => {
  const idSeller = req.params.idSeller;
  const idProduct = req.params.idProducts;
  res.send(`Seller-${idSeller}-${idProduct}`);
});

test("Test Express route parameter", async () => {
  let response = await request(app).get("/products/aziz");
  expect(response.text).toBe("Product aziz");

  response = await request(app).get("/products/zuha");
  expect(response.text).toBe("Product zuha");

  response = await request(app).get("/categories/1234");
  expect(response.text).toBe("Categories 1234");

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);

  response = await request(app).get("/seller/1234/products/4321");
  expect(response.text).toBe("Seller-1234-4321");
});
