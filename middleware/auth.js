import jwt from "jsonwebtoken";
export function requireUser(req, res, next) {
const auth = req.headers.authorization;
if (!auth) return res.status(401).json({ error: "Missing Authorization header" });
const token = auth.replace("Bearer ", "");
try {
const user = jwt.verify(token, process.env.JWT_SECRET);
req.user = user;
next();
 } catch {
res.status(401).json({ error: "Invalid token" });
 }
}