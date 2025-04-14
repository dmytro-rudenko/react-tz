import { Router } from "express";
import knex from "../services/knex.service.js";

const router = Router();

/* GET orders listing. */
router.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await knex("users").where({ id: userId }).first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const orders = await knex("orders")
      .where({ userId })
      .orderBy("createdAt", "desc");
  
    res.json(orders);
  } catch (err) {
    console.error("Error getting orders:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res, next) => {
  const { userId, productId, quantity } = req.body;

  const trx = await knex.transaction();

  try {
    const user = await trx("users").where({ id: userId }).first();
    if (!user) {
      await trx.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    const product = await trx("products").where({ id: productId }).first();
    if (!product) {
      await trx.rollback();
      return res.status(404).json({ error: "Product not found" });
    }

    const totalPrice = Number(product.price) * quantity;

    if (product.stock < quantity) {
      await trx.rollback();
      return res.status(400).json({ error: "Not enough stock" });
    }

    if (Number(user.balance) < totalPrice) {
      await trx.rollback();
      return res.status(400).json({ error: "Insufficient balance" });
    }

    await trx("users")
      .where({ id: userId })
      .update({
        balance: knex.raw("?? - ?", ["balance", totalPrice]),
      });

    await trx("products")
      .where({ id: productId })
      .update({
        stock: knex.raw("?? - ?", ["stock", quantity]),
      });

    const [order] = await trx("orders")
      .insert({
        id: knex.raw("gen_random_uuid()"),
        userId,
        productId,
        quantity,
        totalPrice,
      })
      .returning("*");

    await trx.commit();
    res.status(201).json(order);
  } catch (err) {
    await trx.rollback();
    console.error("Transaction failed:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
