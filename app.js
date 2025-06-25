import express from "express";
import cors from "cors";

import usersRouter from "./routes/users.js";
import booksRouter from "./routes/books.js";
import ordersRouter from "./routes/orders.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
