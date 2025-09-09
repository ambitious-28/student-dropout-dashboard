import React, { useState } from "react";
import { GraduationCap, Users, Shield, BarChart3 } from "lucide-react";
import RoleSelector from "../components/RoleSelector";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

// Abstract dark background shapes
const AbstractBG = () => (
  <svg
    className="absolute top-0 right-0 w-[600px] h-[420px] opacity-30 pointer-events-none -z-10"
    viewBox="0 0 600 420"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="370" cy="170" rx="220" ry="135" fill="#23a6d5" />
    <ellipse cx="350" cy="70" rx="120" ry="60" fill="#ff7d29" />
    <ellipse cx="160" cy="340" rx="60" ry="38" fill="#164e7a" />
    <ellipse
      cx="420"
      cy="340"
      rx="70"
      ry="35"
      fill="#ab5100"
      fillOpacity="0.18"
    />
  </svg>
);

const features = [
  {
    icon: BarChart3,
    title: "Dropout Prediction",
    description:
      "AI-powered early detection of students at risk of dropping out",
    color: "bg-gradient-to-tr from-[#ff7d29] to-[#fbbf24]",
  },
  {
    icon: Users,
    title: "Counselling Support",
    description: "Direct communication between students and counsellors",
    color: "bg-gradient-to-tr from-[#34e6e4] to-[#21a1a0]",
  },
  {
    icon: Shield,
    title: "Progress Tracker",
    description: "Secure, role-based access with student progress monitoring",
    color: "bg-gradient-to-tr from-[#164e7a] to-[#0b2e4d]",
  },
];

export const LandingPage = () => {
  const [authType, setAuthType] = useState<"login" | "signup" | null>(null);
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(
    null
  );

  const [showModal, setShowModal] = useState(false);

  const handleAuthClick = (type: "login" | "signup") => {
    setAuthType(type);
    setSelectedRole(null); // reset role
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setAuthType(null);
    setSelectedRole(null);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0f17] font-opensans text-white overflow-x-hidden">
      <AbstractBG />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center bg-[#13151f] rounded-b-3xl shadow-lg relative z-10">
        <span className="font-playfair text-3xl font-extrabold text-[#ff7d29] tracking-tight">
          ThriveTrack
        </span>
        <div className="flex gap-8 font-semibold">
          <a href="#" className="text-gray-300 hover:text-[#ff7d29] transition">
            Features
          </a>
          <a href="#" className="text-gray-300 hover:text-[#ff7d29] transition">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-[#ff7d29] transition">
            FAQ
          </a>
          <button
            onClick={() => handleAuthClick("login")}
            className="rounded-xl px-6 py-2 border border-[#ff7d29] text-[#ff7d29] hover:bg-[#ff7d29]/20 transition font-bold"
          >
            Log In
          </button>
          <button
            onClick={() => handleAuthClick("signup")}
            className="rounded-xl px-6 py-2 bg-gradient-to-r from-[#ff7d29] via-[#fbbf24] to-[#ffbf49] text-[#0c0f17] font-bold hover:scale-105 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-8 py-20 relative z-10">
        <div className="md:w-1/2 space-y-6">
          <h1 className="font-playfair text-5xl md:text-6xl font-extrabold leading-tight text-[#fbbf24]">
            Catch the Drift <br />
            <span className="text-[#ff7d29]">Before the Drop</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-lg font-semibold">
            Our platform helps educational institutions identify at-risk
            students early and provide timely interventions through data-driven
            insights and personalized support.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => setSelectedRole("student")}
              className={`px-8 py-3 rounded-2xl text-lg font-semibold transition border-2 ${
                selectedRole === "student"
                  ? "bg-[#ff7d29] border-[#fbbf24] text-[#0c0f17]"
                  : "border-[#ff7d29] text-[#ff7d29] hover:bg-[#ff7d29]/30 hover:text-[#0c0f17]"
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setSelectedRole("teacher")}
              className={`px-8 py-3 rounded-2xl text-lg font-semibold transition border-2 ${
                selectedRole === "teacher"
                  ? "bg-[#fbbf24] border-[#ff7d29] text-[#0c0f17]"
                  : "border-[#fbbf24] text-[#fbbf24] hover:bg-[#fbbf24]/30 hover:text-[#0c0f17]"
              }`}
            >
              Teacher
            </button>
          </div>
        </div>

        {/* Hero Right: abstract illustration */}
        <div className="md:w-1/2 relative min-h-[360px] flex justify-center items-center">
          <svg
            viewBox="0 0 420 310"
            fill="none"
            className="w-full max-w-lg opacity-40"
          >
            <ellipse cx="210" cy="155" rx="180" ry="120" fill="#13131a" />
            <ellipse
              cx="320"
              cy="120"
              rx="46"
              ry="28"
              fill="#ff7d29"
              opacity={0.25}
            />
            <ellipse
              cx="84"
              cy="235"
              rx="22"
              ry="18"
              fill="#fbbf24"
              opacity={0.22}
            />
            <circle cx="280" cy="200" r="37" fill="#fbbf24" opacity={0.17} />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-16 px-8">
        <h2 className="font-playfair text-4xl text-center font-extrabold text-[#fbbf24] mb-14">
          Flash Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ icon: Icon, title, description, color }, i) => (
            <div
              key={i}
              className={`bg-[#191b22] rounded-3xl p-8 shadow-lg border-t-4 ${color} text-white flex flex-col items-center`}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl mb-6 bg-gradient-to-tr from-[#ff7d29] to-[#fbbf24]">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl mb-3 font-playfair font-bold text-[#fbbf24] text-center">
                {title}
              </h3>
              <p className="text-[#ffddb2] text-center text-lg">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="text-center py-16 bg-[#13131a] border-t border-[#ff7d29]/50">
        <h3 className="text-3xl font-playfair font-extrabold text-[#ff7d29] mb-6">
          "Empowering Minds, Inspiring Futures"
        </h3>
        <p className="max-w-2xl mx-auto text-[#fbbf24] text-lg font-semibold">
          Join us in shaping confident futures by transforming data into timely,
          meaningful action.
        </p>
      </footer>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#191b22] rounded-2xl p-8 w-full max-w-md relative shadow-lg">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Step 1: Role Selector */}
            {!selectedRole ? (
              <RoleSelector
                onSelect={(role) => setSelectedRole(role)}
                onClose={closeModal}
              />
            ) : authType === "login" ? (
              <LoginForm role={selectedRole} onClose={closeModal} />
            ) : (
              <SignupForm role={selectedRole} onClose={closeModal} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
