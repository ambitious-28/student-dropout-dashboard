import React from "react";
import { GraduationCap, User } from "lucide-react";

interface RoleSelectorProps {
  onSelect: (role: "student" | "teacher") => void;
  onClose: () => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect, onClose }) => {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* Title */}
      <h2 className="text-2xl font-playfair font-bold text-[#fbbf24]">
        Select Your Role
      </h2>
      <p className="text-gray-300 text-sm max-w-sm">
        Choose whether you’re a <span className="text-[#ff7d29]">Student</span>{" "}
        or <span className="text-[#34e6e4]">Teacher</span> to continue.
      </p>

      {/* Role Buttons */}
      <div className="flex gap-6">
        {/* Student */}
        <button
          onClick={() => onSelect("student")}
          className="flex flex-col items-center justify-center bg-gradient-to-tr from-[#ff7d29] to-[#fbbf24] text-[#0c0f17] font-semibold px-10 py-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition transform"
        >
          <GraduationCap className="w-8 h-8 mb-2" />
          Student
        </button>

        {/* Teacher */}
        <button
          onClick={() => onSelect("teacher")}
          className="flex flex-col items-center justify-center bg-gradient-to-tr from-[#34e6e4] to-[#21a1a0] text-[#0c0f17] font-semibold px-10 py-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition transform"
        >
          <User className="w-8 h-8 mb-2" />
          Teacher
        </button>
      </div>

      {/* Cancel */}
      <button
        onClick={onClose}
        className="mt-4 text-gray-400 hover:text-white text-sm underline"
      >
        Cancel
      </button>
    </div>
  );
};

export default RoleSelector;

