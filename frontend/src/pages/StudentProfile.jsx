import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const res = await api.get(`students/${id}/`);
      setStudent(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!student) {
    return <h4 className="text-center mt-5">Loading...</h4>;
  }

  const avatar = student.name ? student.name.charAt(0).toUpperCase() : "?";

  return (
    <div className={darkMode ? "bg-dark text-white min-vh-100 py-4" : "bg-light min-vh-100 py-4"}>
      <div className="container">

        {/* TOP BAR */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Student Profile</h3>

          <button
            className={darkMode ? "btn btn-light" : "btn btn-dark"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* MAIN CARD */}
        <div className={darkMode ? "card bg-secondary text-white shadow-lg border-0 rounded-4" : "card shadow-lg border-0 rounded-4"}>
          <div className="card-body p-4">

            {/* HEADER */}
            <div className="d-flex align-items-center mb-4">

              {student.photo ? (
              <img
                src={`http://127.0.0.1:8000${student.photo}`}
                alt="Student"
                className="rounded-circle"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover"
                }}
              />
            ) : (
              <div
                className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "35px",
                  fontWeight: "bold"
                }}
              >
                {avatar}
              </div>
            )}

              <div>
                <h4 className="mb-0">{student.name}</h4>
                <small>ID: {student.id}</small>
              </div>

            </div>

            {/* DETAILS */}
            <div className="row">

              <div className="col-md-6">
                <p><b>Email:</b> {student.email}</p>
                <p><b>Contact:</b> {student.contact}</p>
                <p><b>Address:</b> {student.address}</p>
              </div>

              <div className="col-md-6">
                <p><b>Course:</b> {student.course_name}</p>
                <p><b>Fees:</b> ₹{student.fees}</p>
                <p><b>Admission Date:</b> {student.admission_date}</p>

                <p>
                  <b>Fee Status:</b>{" "}
                  <span className={student.fee_status === "Paid" ? "badge bg-success" : "badge bg-danger"}>
                    {student.fee_status}
                  </span>
                </p>

               <div className="mt-3">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/students/idcard/${student.id}`)}
                >
                  Generate ID Card
                </button>
              </div> 
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default StudentProfile;