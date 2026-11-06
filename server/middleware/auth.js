import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";

export async function protectAdmin(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "chalcedony_super_secure_jwt_secret_key_2026"
      );
      req.admin = await Admin.findById(decoded.id).select("-password");
      if (!req.admin) {
        return res.status(401).json({ message: "Admin account not found" });
      }
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired authorization token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }
}
