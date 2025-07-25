import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        message: "Too many requests, try after 5 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default authLimiter;