// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Students from "./pages/Students";
// import AddStudent from "./pages/AddStudent";
// import Courses from "./pages/Courses";
// import EditStudent from "./pages/EditStudent";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import EditCourse from "./pages/EditCourse";
// import StudentProfile from "./pages/StudentProfile";
// import  Login from "./pages/Login";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   return (
//     <BrowserRouter>
//     <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
//         <Route path="/students/add" element={<AddStudent />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/students/edit/:id" element={<EditStudent />} />
//         <Route path="/courses/edit/:id" element={<EditCourse />} />
//         <Route path="/students/:id" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// 

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Students from "./pages/Students";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import AddStudent from "./pages/AddStudent";
import Home from "./pages/Home";

import EditStudent from "./pages/EditStudent";
import EditCourse from "./pages/EditCourse";
import StudentProfile from "./pages/StudentProfile";
import Fees from "./pages/Fees";
import AddFee from "./pages/AddFee";
import EditFee from "./pages/EditFee";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import FeesReport from "./pages/FeesReport";
import PendingFees from "./pages/PendingFees";
import DailyCollection from "./pages/DailyCollection";
import Attendance from "./pages/Attendance";
import StudentAttendance from "./pages/StudentAttendance";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import StudentIdCard from "./pages/StudentIdCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Layout */}
        <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<Students />} />
            <Route path="students/add" element={<AddStudent />} />
            <Route path="students/edit/:id" element={<EditStudent />} />
            <Route path="students/:id" element={<StudentProfile />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/edit/:id" element={<EditCourse />} />
            <Route path="fees" element={<Fees />} />
            <Route path="fees/add" element={<AddFee />} />
            <Route path="fees/edit/:id" element={<EditFee />} />
            <Route path="fees/reports" element={<FeesReport />} />
            <Route path="fees/pending" element={<PendingFees />} />
            <Route path="fees/daily" element={<DailyCollection />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="attendance/:id" element={<StudentAttendance />} />
            <Route path="profile" element={<Profile />} />
            <Route path="/students/idcard/:id" element={<StudentIdCard/>} />


          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;