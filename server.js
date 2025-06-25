import app from "./app.js";
import db from "./db/client.js";
import booksRouter from "./routes/books.js";
app.use("/books", booksRouter);
const PORT = process.env.PORT || 3000;
await db.connect();
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});