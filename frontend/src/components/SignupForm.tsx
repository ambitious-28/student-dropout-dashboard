import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { User, Mail, Lock, IdCard } from "lucide-react";

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
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-playfair font-bold text-[#fbbf24]">
        {role === "student" ? "Student Signup" : "Teacher Signup"}
      </h2>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {/* Name */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
          />
        </div>

        {/* Roll No / Employee ID */}
        <div className="relative">
          <IdCard className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          {role === "student" ? (
            <input
              type="text"
              name="roll_no"
              placeholder="Roll Number"
              value={formData.roll_no}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
            />
          ) : (
            <input
              type="text"
              name="emp_id"
              placeholder="Employee ID"
              value={formData.emp_id}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
            />
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
          />
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="w-1/2 py-2 rounded-lg border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-[#ff7d29] via-[#fbbf24] to-[#ffbf49] text-[#0c0f17] font-bold hover:scale-105 transition"
          >
            Sign Up
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SignupForm;
