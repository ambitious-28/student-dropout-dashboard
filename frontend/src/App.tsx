import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
    </Routes>
  );
}

export default App;
