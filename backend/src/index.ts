import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // <-- import cors
import studentAuthRouter from "./routes/auth/student.routes";
import teacherAuthRouter from "./routes/auth/teacher.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if sending cookies or auth headers
}));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/auth/student", studentAuthRouter);
app.use("/auth/teacher", teacherAuthRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server started at http://localhost:${PORT}`);
});
