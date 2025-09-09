import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface LoginFormProps {
  role: "student" | "teacher";
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ role, onClose }) => {
  const [formData, setFormData] = useState({
    roll_no: "",
    emp_id: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload =
        role === "student"
          ? { roll_no: formData.roll_no, password: formData.password }
          : { emp_id: formData.emp_id, password: formData.password };

      const endpoint =
        role === "student" ? "/auth/student/login" : "/auth/teacher/login";

      const res = await api.post(endpoint, payload);

      if (res.status === 200) {
        // ✅ redirect based on role
        navigate(role === "student" ? "/student-dashboard" : "/teacher-dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{role === "student" ? "Student Login" : "Teacher Login"}</h2>
        <form onSubmit={handleSubmit}>
          {role === "student" ? (
            <input
              type="text"
              name="roll_no"
              placeholder="Roll Number"
              value={formData.roll_no}
              onChange={handleChange}
              required
            />
          ) : (
            <input
              type="text"
              name="emp_id"
              placeholder="Employee ID"
              value={formData.emp_id}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
