import express from 'express';
import db from '../db/client.js';

const router = express.Router();

// GET /books - get all books
router.get("/", async (req, res, next)=>{
    try {
        const {rows} = await db.query(`SELECT * FROM books`);
        res.send(rows);
    }   catch (err) {
        next(err);
    }
});

// GET /books/:id - get single book by ID
router.get("/:id", async (req, res, next)=>{
    const {id} = req.params;

    try {
        const {
            rows: [book],
        } = db.query(`SELECT * FROM books WHERE id = $1` , [id]);

        if (!book) return res.status(404).json({ error: "Book not found"});

        res.send(book);
    }   catch (err) {
        next (err);
    }
});


export default router;










