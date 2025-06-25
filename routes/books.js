import express from "express";
import db from "../db/client.js";
import { requireUser } from "../middleware/auth.js";
const router = express.Router();
// GET /books - get all books
router.get("/", async (req, res, next) => {
try {
const { rows } = await db.query(`SELECT * FROM books`);
res.send(rows);
 } catch (err) {
next(err);
 }
});
// GET /books/:id - get single book by ID
router.get("/:id", async (req, res, next) => {
const { id } = req.params;
try {
const {
rows: [book],
 } = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
if (!book) return res.status(404).json({ error: "Book not found" });
res.send(book);
 } catch (err) {
next(err);
 }
});
// GET /books/:id/reviews - get book by ID reviews
router.get("/:id/reviews", requireUser, async (req, res, next) => {
const { id } = req.params;
try {
const {
rows: bookCheck,
 } = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
if (!bookCheck.length) {
return res.status(404).json({ error: "Book not found" });
 }
const { rows: reviews } = await db.query(
`SELECT reviews.*, users.username
 FROM reviews
 JOIN users ON reviews.user_id = users.id
 WHERE reviews.book_id = $1`,
 [id]
 );
res.send(reviews);
 } catch (err) {
next(err);
 }
});
// POST /books/:id/reviews - create a review for a book
router.post("/:id/reviews", requireUser, async (req, res, next) => {
const { id } = req.params;
const { rating, content } = req.body;
const userId = req.user.id;
// Validation
 if (!rating || rating < 1 || rating > 5) {
return res.status(400).json({ error: "Rating must be between 1 and 5" });
 }
try {
// Check that the book exists
const {
rows: [book],
 } = await db.query(`SELECT * FROM books WHERE id = $1`, [id]);
if (!book) {
return res.status(404).json({ error: "Book not found" });
 }
// Insert review into the database
const {
rows: [newReview],
 } = await db.query(
`INSERT INTO reviews (book_id, user_id, content, rating)
 VALUES ($1, $2, $3, $4)
 RETURNING *`,
 [id, userId, content, rating]
 );
// Add username to the response
newReview.username = req.user.username;
res.status(201).json(newReview);
 } catch (err) {
next(err);
 }
});
export default router;