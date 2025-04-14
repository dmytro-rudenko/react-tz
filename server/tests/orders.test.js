import request from "supertest";
import express from "express";
import ordersRouter from "../routes/orders.routes.js";
import knex from "../services/knex.service.js";
import { userId, productId, name, email } from "./consts.js";
import { resetDb } from "./utils.js";

const app = express();
app.use(express.json());
app.use("/orders", ordersRouter);

beforeEach(async () => {
  await resetDb(knex);

  await knex("users")
    .insert({
      id: userId,
      name: name,
      email: email,
      balance: 500.0,
    })
    .onConflict("id")
    .ignore();

  await knex("products").insert({
    id: productId,
    name: "Test Product",
    price: 100.0,
    stock: 10,
  });
});

describe("POST /orders", () => {
  it("should fail when user does not exist", async () => {
    const response = await request(app).post("/orders").send({
      userId: "00000000-0000-0000-0000-000000000000",
      productId: productId,
      quantity: 1,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("User not found");
  });

  it("should fail when product does not exist", async () => {
    const response = await request(app).post("/orders").send({
      userId: userId, 
      productId: "00000000-0000-0000-0000-000000000000", 
      quantity: 1,
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe("Product not found");
  });

  it("should update user balance and product stock after order", async () => {
    const initialBalance = 500.0;
    const initialStock = 10;

    const response = await request(app).post("/orders").send({
      userId: userId,
      productId: productId,
      quantity: 2,
    });

    expect(response.statusCode).toBe(201);

    const user = await knex("users")
      .where({ id: userId })
      .first();
    const product = await knex("products")
      .where({ id: productId })
      .first();

    expect(parseFloat(user.balance)).toBeCloseTo(initialBalance - 200.0, 2);
    expect(product.stock).toBe(initialStock - 2);
  });

  it("should create an order when balance and stock are sufficient", async () => {
    const response = await request(app).post("/orders").send({
      userId: userId,
      productId: productId,
      quantity: 2,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.totalPrice).toBe("200.00");
  });

  it("should fail when balance is insufficient", async () => {
    await knex("users")
      .where({ id: userId })
      .update({ balance: 50 });

    const response = await request(app).post("/orders").send({
      userId: userId,
      productId: productId,
      quantity: 1,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Insufficient balance");
  });

  it("should fail when stock is insufficient", async () => {
    const response = await request(app).post("/orders").send({
      userId: userId,
      productId: productId,
      quantity: 999,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("Not enough stock");
  });
});

describe("GET /orders/:userId", () => {
  it("should return empty array initially", async () => {
    const response = await request(app).get(
      "/orders/00000000-0000-0000-0000-000000000001"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should return orders after creation", async () => {
    await request(app).post("/orders").send({
      userId: userId,
      productId: productId,
      quantity: 1,
    });

    const response = await request(app).get(
      "/orders/00000000-0000-0000-0000-000000000001"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("productId");
  });
});

afterAll(async () => {
  await knex.seed.run();

  await knex.destroy();

  if (global.server) {
    global.server.close();
  }
});
