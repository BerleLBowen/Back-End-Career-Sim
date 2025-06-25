import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

function requireUser(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header required" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("Invalid token", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export { requireUser };
