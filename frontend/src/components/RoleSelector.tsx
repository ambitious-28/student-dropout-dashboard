import React from "react";

interface RoleSelectorProps {
  onSelect: (role: "student" | "teacher") => void;
  onClose: () => void;   // ✅ added this
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select Role</h2>
        <button onClick={() => onSelect("student")}>Student</button>
        <button onClick={() => onSelect("teacher")}>Teacher</button>
        <button onClick={onClose}>Close</button> {/* ✅ close button */}
      </div>
    </div>
  );
};

export default RoleSelector;
