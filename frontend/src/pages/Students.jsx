// import { useEffect, useState } from "react";
// import api from "../services/api";
// import { FaUsers, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
// import {Link, useNavigate} from 'react-router-dom';

// function Students() {
//   const navigate = useNavigate();

//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   useEffect(() => {
//     loadStudents();
//   }, []);

//   const loadStudents = async () => {
//     try {
//       const res = await api.get("students/");
//       setStudents(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteStudent = async (id) => {
//     if (window.confirm("Are you sure you want to delete this student?")) {
//       try {
//         await api.delete(`students/${id}/`);
//         loadStudents();
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   // Search filter
//   const filteredStudents = students.filter((s) =>
//     s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   // Fee status filter
//   const displayedStudents = filteredStudents.filter((student) => {
//     if (statusFilter === "All") return true;
//     return student.fee_status === statusFilter;
//   });

//   // Dashboard stats
//   const totalStudents = students.length;

//   const paidStudents = students.filter(
//     (s) => s.fee_status === "Paid"
//   ).length;

//   const pendingStudents = students.filter(
//     (s) => s.fee_status === "Pending"
//   ).length;

//   return (
//     <div className="container mt-4">

//       <h2 className="mb-3">Students Dashboard</h2>

//       {/* DASHBOARD CARDS */}
//       <div className="row mb-3 g-3">

//         <div className="col-md-4">
//           <div className="card shadow-lg border-0 rounded-4 text-white bg-primary">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div>
//                 <h6 className="mb-1">Total Students</h6>
//                 <h3 className="mb-0">{totalStudents}</h3>
//               </div>
//               <FaUsers size={40} opacity={0.8} />
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow-lg border-0 rounded-4 text-white bg-success">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div>
//                 <h6 className="mb-1">Paid Fees</h6>
//                 <h3 className="mb-0">{paidStudents}</h3>
//               </div>
//               <FaCheckCircle size={40} opacity={0.8} />
//             </div>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card shadow-lg border-0 rounded-4 text-white bg-danger">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div>
//                 <h6 className="mb-1">Pending Fees</h6>
//                 <h3 className="mb-0">{pendingStudents}</h3>
//               </div>
//               <FaHourglassHalf size={40} opacity={0.8} />
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* SEARCH */}
//       <input
//         type="text"
//         className="form-control mb-3"
//         placeholder="Search student by name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* FILTER */}
//       <select
//         className="form-select mb-3"
//         value={statusFilter}
//         onChange={(e) => setStatusFilter(e.target.value)}
//       >
//         <option value="All">All Students</option>
//         <option value="Paid">Paid</option>
//         <option value="Pending">Pending</option>
//       </select>

//       {/* TABLE */}
//       <table className="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Contact</th>
//             <th>Address</th>
//             <th>Admission Date</th>
//             <th>Course</th>
//             <th>Fees</th>
//             <th>Fee Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {displayedStudents.length > 0 ? (
//             displayedStudents.map((student) => (
//               <tr key={student.id}>
//                 <td>{student.id}</td>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{student.contact}</td>
//                 <td>{student.address}</td>
//                 <td>{student.admission_date}</td>
//                 <td>{student.course_name}</td>
//                 <td>₹{student.fees}</td>

//                 <td>
//                   <span
//                     className={
//                       student.fee_status === "Paid"
//                         ? "badge bg-success"
//                         : "badge bg-danger"
//                     }
//                   >
//                     {student.fee_status}
//                   </span>
//                 </td>

//                 <td>

//                   <Link
//                     to={`/students/${student.id}`}
//                     className="btn btn-info btn-sm me-2"
//                   >
//                     View
//                   </Link>
                  
//                   <Link
//                     to={`/students/edit/${student.id}`}
//                     className="btn btn-primary btn-sm me-2"
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     className="btn btn-warning btn-sm me-2"
//                     onClick={() => navigate(`/attendance/${student.id}`)}
//                   >
//                     Attendance
//                   </button>

//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteStudent(student.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10" className="text-center">
//                 No students found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Students;


import { useEffect, useState } from "react";
import api from "../services/api";
import { FaUsers, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("students/");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await api.delete(`students/${id}/`);
        loadStudents();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayedStudents = filteredStudents.filter((student) => {
    if (statusFilter === "All") return true;
    return student.fee_status === statusFilter;
  });

  const totalStudents = students.length;

  const paidStudents = students.filter(
    (s) => s.fee_status === "Paid"
  ).length;

  const pendingStudents = students.filter(
    (s) => s.fee_status === "Pending"
  ).length;

  return (
    <div className="container-fluid px-4 py-4">

      <h2 className="fw-bold mb-4">Students Dashboard</h2>

      <div className="row g-4 mb-4">

        <div className="col-lg-4 col-md-6">
          <div className="card shadow border-0 bg-primary text-white rounded-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6>Total Students</h6>
                <h2>{totalStudents}</h2>
              </div>
              <FaUsers size={45}/>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card shadow border-0 bg-success text-white rounded-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6>Paid Fees</h6>
                <h2>{paidStudents}</h2>
              </div>
              <FaCheckCircle size={45}/>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card shadow border-0 bg-danger text-white rounded-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <h6>Pending Fees</h6>
                <h2>{pendingStudents}</h2>
              </div>
              <FaHourglassHalf size={45}/>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow border-0 rounded-4">

        <div className="card-body">

          <div className="row mb-3">

            <div className="col-md-8 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search student..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <select
                className="form-select"
                value={statusFilter}
                onChange={(e)=>setStatusFilter(e.target.value)}
              >
                <option value="All">All Students</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

          </div>

          <div className="table-responsive">

            <table className="table table-hover table-bordered align-middle">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Admission Date</th>
                  <th>Course</th>
                  <th>Fees</th>
                  <th>Status</th>
                  <th style={{minWidth:"330px"}}>Actions</th>
                </tr>

              </thead>

              <tbody>
                {displayedStudents.length > 0 ? (
                  displayedStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td className="fw-semibold">{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.contact}</td>
                      <td>{student.address}</td>
                      <td>{student.admission_date}</td>
                      <td>{student.course_name}</td>
                      <td>₹{student.fees}</td>

                      <td>
                        <span
                          className={
                            student.fee_status === "Paid"
                              ? "badge bg-success"
                              : "badge bg-danger"
                          }
                        >
                          {student.fee_status}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex flex-wrap gap-2">

                          <Link
                            to={`/students/${student.id}`}
                            className="btn btn-info btn-sm"
                          >
                            View
                          </Link>

                          <Link
                            to={`/students/edit/${student.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </Link>

                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => navigate(`/attendance/${student.id}`)}
                          >
                            Attendance
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteStudent(student.id)}
                          >
                            Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No students found
                    </td>
                  </tr>
                )}

                              </tbody>
                            </table>

                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                export default Students;