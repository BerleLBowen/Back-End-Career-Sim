import express from "express";
import booksRouter from "./routes/books.js";
const app = express();

app.use(express.json());

// Add routers here later
app.use("/books", booksRouter);


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});

export default app;