import express from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

function generateToken(id) {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || "chalcedony_super_secure_jwt_secret_key_2026",
    { expiresIn: "7d" }
  );
}

// Auto-seed default admin if database has no admins
export async function seedInitialAdmin() {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      console.log("Seeding default MongoDB admin account...");
      await Admin.create({
        email: "admin@chalcedony.com",
        password: "chalcedony2026",
        name: "Chalcedony Administrator",
        role: "superadmin",
      });
      console.log("Default admin created: admin@chalcedony.com / chalcedony2026");
    }
  } catch (err) {
    console.warn("Could not seed default admin:", err.message);
  }
}

// @route   POST /api/auth/login
// @desc    Authenticate admin in MongoDB & get JWT token
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    // Support logging in with 'admin' as shorthand email
    const queryEmail = email.includes("@") ? email.toLowerCase().trim() : "admin@chalcedony.com";

    const admin = await Admin.findOne({ email: queryEmail });
    if (!admin) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = generateToken(admin._id);

    return res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error during authentication" });
  }
});

// @route   POST /api/auth/register
// @desc    Register a new admin account (protected)
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    const admin = await Admin.create({
      email: email.toLowerCase(),
      password,
      name: name || "Staff Member",
      role: role || "admin",
    });

    const token = generateToken(admin._id);

    return res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get currently logged in admin from token
router.get("/me", protectAdmin, async (req, res) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
});

export default router;
