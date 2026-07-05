// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">

//       <Link className="navbar-brand" to="/students">
//         CRM System
//       </Link>
      
//         <Link to="/dashboard">Dashboard</Link>
//         <Link to="/students">Students</Link>
//         <Link to="/add-student">Add Student</Link>
//         <Link to="/courses">Courses</Link>

//       <div>
//         <button className="btn btn-danger btn-sm" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//     </nav>
//   );
// }

// export default Navbar;


// import { Link, useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">

//       <Link className="navbar-brand" to="/dashboard">
//         CRM System
//       </Link>

//       <div className="d-flex gap-3">

//         <Link className="text-white" to="/dashboard">Dashboard</Link>
//         <Link className="text-white" to="/students">Students</Link>
//         <Link className="text-white" to="/courses">Courses</Link>
//         <Link className="text-white" to="/add-student">Add Student</Link>

//         <button className="btn btn-danger btn-sm" onClick={logout}>
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Students from "./pages/Students";
// import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";
// import AddStudent from "./pages/AddStudent";

// import ProtectedRoute from "./components/ProtectedRoute";
// import MainLayout from "./components/MainLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* 🔓 Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* 🔐 Protected Layout */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <MainLayout />
//             </ProtectedRoute>
//           }
//         >

//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="students" element={<Students />} />
//           <Route path="courses" element={<Courses />} />
//           <Route path="add-student" element={<AddStudent />} />

//         </Route>

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">

//       <span className="navbar-brand">
//         ERP System
//       </span>

//       <button className="btn btn-danger btn-sm" onClick={logout}>
//         Logout
//       </button>

//     </nav>
//   );
// }

// export default Navbar;


import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <nav
      className="navbar px-4 py-3 shadow-sm"
      style={{
        background: "white",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <h4 className="m-0 fw-bold">
        ABC Institute of Technology
      </h4>

      <div className="d-flex align-items-center gap-4">
        <FaBell size={22} />

        <FaUserCircle 
         size={35}
         style={{cursor:"pointer"}}
         onClick={()=>navigate("/profile")} 
        />

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;