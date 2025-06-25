import express from "express";
import db from "../db/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireUser } from "../middleware/auth.js";
const router = express.Router();
const SALT_ROUNDS = 10;
// POST /users/register
router.post("/register", async (req, res, next) => {
const { username, password } = req.body;
try {
const {
rows: [existing],
 } = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
if (existing) return res.status(400).json({ error: "Username already taken" });
const hashed = await bcrypt.hash(password, SALT_ROUNDS);
const {
rows: [user],
 } = await db.query(
`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username`,
 [username, hashed]
 );
const token = jwt.sign(user, process.env.JWT_SECRET);
res.send({ token });
 } catch (err) {
next(err);
 }
});
// POST /users/login
router.post("/login", async (req, res, next) => {
const { username, password } = req.body;
try {
const {
rows: [user],
 } = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);
if (!user) return res.status(401).json({ error: "Invalid credentials" });
const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ error: "Invalid credentials" });
delete user.password;
const token = jwt.sign(user, process.env.JWT_SECRET);
res.send({ token });
 } catch (err) {
next(err);
 }
});
// GET /users/me - Authenticated user info + their reviews
router.get("/me", requireUser, async (req, res, next) => {
try {
const {
rows: reviews,
 } = await db.query(
`SELECT reviews.*, books.title
 FROM reviews
 JOIN books ON reviews.book_id = books.id
 WHERE reviews.user_id = $1`,
 [req.user.id]
 );
res.send({
id: req.user.id,
username: req.user.username,
reviews,
 });
 } catch (err) {
next(err);
 }
});
export default router;