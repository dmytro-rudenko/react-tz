export const rateLimitConfig = {
  windowMs: 60 * 1000, // 1 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      message: "Too many requests, please try again later.",
    });
  },
};
