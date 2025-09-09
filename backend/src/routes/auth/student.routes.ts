import express from "express";
import bcrypt from "bcrypt";
import pool from "../../db";
import jwt from "jsonwebtoken";

const router = express.Router();

// --------------------- Student Signup ---------------------
router.post("/register", async (req, res) => {
  try {
    const { name, roll_no, email, password, confirm_password } = req.body;

    if (!name || !roll_no || !email || !password || !confirm_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if student already exists
    const existingStudent = await pool.query(
      "SELECT * FROM students WHERE roll_no = $1",
      [roll_no]
    );
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into DB
    const newStudent = await pool.query(
      "INSERT INTO students (roll_no, name, email, password) VALUES ($1, $2, $3, $4) RETURNING roll_no, name, email, created_at",
      [roll_no, name, email, hashedPassword]
    );

    res.status(201).json({ user: newStudent.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- Student Login ---------------------
router.post("/login", async (req, res) => {
  try {
    const { roll_no, password } = req.body;

    if (!roll_no || !password) {
      return res.status(400).json({ message: "Roll number and password are required" });
    }

    const studentResult = await pool.query(
      "SELECT * FROM students WHERE roll_no = $1",
      [roll_no]
    );

    if (studentResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    const student = studentResult.rows[0];

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid roll number or password" });
    }

    const token = jwt.sign(
      { roll_no: student.roll_no, name: student.name },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
