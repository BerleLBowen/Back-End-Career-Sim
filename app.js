import express from "express";
import usersRouter from "./routes/users.js";
const app = express();

app.use(express.json());

app.use("/users", usersRouter);

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
