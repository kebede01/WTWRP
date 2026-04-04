import { rateLimit } from 'express-rate-limit';
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100, 
  message: { error: "Too many requests, please try again later." },
});

// Extra strict protection for Login/Signup
export const authLimiter = rateLimit({
  // windowMs: 60 * 60 * 1000, // 1 hour
  // If we are in development, allow 1000 tries, else 5
  limit: process.env.NODE_ENV === 'production' ? 5 : 1000,
  // limit: 5, // Only 5 failed attempts per hour
  message: { error: "Too many login attempts. Please try again in an hour." },
});
