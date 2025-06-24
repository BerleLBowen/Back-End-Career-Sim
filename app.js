import express from "express";
const app = express();
import usersRouter from "./routes/users.js";
app.use("/users", userRoutes);
app.use(express.json());

// Add routers here later

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong.");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use("/users", usersRouter);

export default app;
