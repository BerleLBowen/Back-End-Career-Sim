import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireUser } from "../middleware/auth.js";
import db from "../db/client.js";

const router = express.Router();
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

// POST /register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const existing = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    const token = jwt.sign(result.rows[0], JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid credentials" });

    delete user.password;
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /me
router.get("/me", requireUser, async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT reviews.*, books.title
       FROM reviews
       JOIN books ON reviews.book_id = books.id
       WHERE reviews.user_id = $1`,
      [req.user.id]
    );

    res.send({
      id: req.user.id,
      username: req.user.username,
      reviews: result.rows,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
