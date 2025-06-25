import express from 'express'
import db from '../db/client.js'
import { requireUser } from "../middleware/auth.js";
const router = express.Router();

export default router

const { Order } = ('../models');

router.post("/", requireUser, async (req, res, next) => {
    const { date, note } = req.body;
    const {user} = req.user;
    if (!date || !note) return res.status(400).json({ error: "Missing date or note" });

    try {
        const {
           rows: [order],
            } = await db.query(
                `INSERT INTO orders (user_id, date, note) VALUES ($1, $2, $3) RETURNING *`,
                [user.id, date, note]
            );
            res.status(201).send(order);
         } catch (error) {
            next(err);
         }
         });
//sends array of all orders made by the logged-in user
router.get("/", requireUser, async (req, res, next) => {
    const { user } = req.user;

    try {
        const { rows: orders } = await db.query(
            `SELECT * FROM orders WHERE user_id = $1 ORDER BY date DESC`,
            [user.id]
        );

        res.send(orders);
    } catch (err) {
        next(err);
    }
});
//sends 404 if the order does not exist
//sends 403 if the logged-in user is not the user who made the order
//sends the order with the specified id
router.get("/:orderId", requireUser, async (req, res, next) => {
    const { user } = req.user;
    const { id } = req.params;

    try {
        const {
            rows: [order],
        } = await db.query(
            `SELECT * FROM orders WHERE id = $1`,
            [id]
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        if (order.user_id !== user.id) {
            return res.status(403).json({ error: "Access denied: not your order" });
        }

        res.send(order);
    } catch (err) {
        next(err);
    }
});
