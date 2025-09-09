import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface SignupFormProps {
  role: "student" | "teacher";
  onClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ role, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    roll_no: "",
    emp_id: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const payload =
        role === "student"
          ? {
              name: formData.name,
              roll_no: formData.roll_no,
              email: formData.email,
              password: formData.password,
              confirm_password: formData.confirm_password,
            }
          : {
              name: formData.name,
              emp_id: formData.emp_id,
              email: formData.email,
              password: formData.password,
              confirm_password: formData.confirm_password,
            };

      const endpoint =
        role === "student" ? "/auth/student/register" : "/auth/teacher/register";

      const res = await api.post(endpoint, payload);

      if (res.status === 201) {
        navigate(role === "student" ? "/student-dashboard" : "/teacher-dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{role === "student" ? "Student Signup" : "Teacher Signup"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignupForm;
