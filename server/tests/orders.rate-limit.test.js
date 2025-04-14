import request from "supertest";
import app from "../app.js";
import knex from "../services/knex.service.js";
import { userId, name, email } from "./consts.js";
import { rateLimitConfig } from "../app.config.js";
import { resetDb } from "./utils.js";

jest.useFakeTimers();

describe("Rate Limit", () => {
  beforeAll(async () => {
    await resetDb(knex);

    await knex("users")
      .insert({
        id: userId,
        name: name,
        email: email,
        balance: 1000,
      })
      .onConflict("id")
      .ignore();
  });

  it("should block after exceeding limit, then allow after reset", async () => {
    for (let i = 0; i < rateLimitConfig.max; i++) {
      const res = await request(app).get(`/orders/${userId}`);
      expect([200, 404]).toContain(res.status);
    }

    const blocked = await request(app).get(`/orders/${userId}`);
    expect(blocked.status).toBe(429);
    expect(blocked.body).toHaveProperty("message");

    jest.advanceTimersByTime(61 * 1000);

    const afterReset = await request(app).get(`/orders/${userId}`);
    expect([200, 404]).toContain(afterReset.status);
  });

  afterAll(async () => {
    jest.useRealTimers();

    await knex.seed.run();

    knex.destroy();

    if (global.server) {
      global.server.close();
    }
  });
});
