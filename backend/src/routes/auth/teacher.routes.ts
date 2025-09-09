import express from "express";
import bcrypt from "bcrypt";
import pool from "../../db";
import jwt from "jsonwebtoken";

const router = express.Router();

// --------------------- Teacher Signup ---------------------
router.post("/register", async (req, res) => {
  try {
    const { name, emp_id, email, password, confirm_password } = req.body;

    if (!name || !emp_id || !email || !password || !confirm_password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingTeacher = await pool.query(
      "SELECT * FROM teachers WHERE emp_id = $1",
      [emp_id]
    );
    if (existingTeacher.rows.length > 0) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeacher = await pool.query(
      "INSERT INTO teachers (emp_id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING emp_id, name, email, created_at",
      [emp_id, name, email, hashedPassword]
    );

    res.status(201).json({ user: newTeacher.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- Teacher Login ---------------------
router.post("/login", async (req, res) => {
  try {
    const { emp_id, password } = req.body;

    if (!emp_id || !password) {
      return res.status(400).json({ message: "Employee ID and password are required" });
    }

    const teacherResult = await pool.query(
      "SELECT * FROM teachers WHERE emp_id = $1",
      [emp_id]
    );

    if (teacherResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid employee ID or password" });
    }

    const teacher = teacherResult.rows[0];

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid employee ID or password" });
    }

    const token = jwt.sign(
      { emp_id: teacher.emp_id, name: teacher.name },
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
