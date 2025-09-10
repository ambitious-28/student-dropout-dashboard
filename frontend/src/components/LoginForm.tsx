import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { IdCard, Lock } from "lucide-react";

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
        navigate(role === "student" ? "/student-dashboard" : "/teacher-dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal box */}
      <div className="bg-[#111418] rounded-2xl shadow-lg w-full max-w-md p-8 relative border border-gray-700">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-[#fbbf24] mb-6">
          {role === "student" ? "Student Login" : "Teacher Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Roll Number / Employee ID */}
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
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
              />
            ) : (
              <input
                type="text"
                name="emp_id"
                placeholder="Employee ID"
                value={formData.emp_id}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
              />
            )}
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
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#0c0f17] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7d29]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-6">
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
