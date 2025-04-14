import createError from "http-errors";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import cors from "cors";

import ordersRouter from "./routes/orders.routes.js";
import usersRouter from "./routes/users.routes.js";
import productsRouter from "./routes/products.routes.js";
import { rateLimitConfig } from "./app.config.js";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));

// Enable CORS for port 3001
app.use(cors({
  origin: "http://localhost:3001",
}));

// Rate limiting
app.use(
  rateLimit(rateLimitConfig),
);

app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});

export default app;
