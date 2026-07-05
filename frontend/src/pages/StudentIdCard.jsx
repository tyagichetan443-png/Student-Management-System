import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import QRCode from "react-qr-code";
import logo from "../assets/logo.jpeg";
import "./StudentIdCard.css";

function StudentIdCard() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const res = await api.get(`students/${id}/`);
      setStudent(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!student) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  const avatar = student.name
    ? student.name.charAt(0).toUpperCase()
    : "?";

  return (
    <div className="container py-5">

      <div
        id="id-card"
        className="card shadow-lg mx-auto"
        style={{
          width: "380px",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        {/* Header */}
        <div className="bg-primary text-white text-center p-3">

        <img
            src={logo}
            alt="Institute Logo"
            style={{
            width: "70px",
            height: "70px",
            objectFit: "contain"
            }}
            className="mb-2"
        />

        <h4 className="mb-1">
            ABC Institute of Technology
        </h4>

        <small>Student Identity Card</small>
        </div>
        <div className="card-body text-center">

          {/* Student Photo */}
          {student.photo ? (
            <img
              src={student.photo}
              alt="student"
              className="rounded-circle mb-3"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover"
              }}
            />
          ) : (
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mb-3"
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

          <h4>{student.name}</h4>

          <p className="text-muted">
            Student ID : {student.id}
          </p>

          <hr />

          <table className="table table-borderless text-start">
            <tbody>
              <tr>
                <th>Course</th>
                <td>{student.course_name}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{student.email}</td>
              </tr>

              <tr>
                <th>Contact</th>
                <td>{student.contact}</td>
              </tr>

              <tr>
                <th>Admission</th>
                <td>{student.admission_date}</td>
              </tr>
            </tbody>
          </table>

          {/* QR Code */}
          <div className="mt-3">
            <QRCode
              size={90}
              value={`Student ID: ${student.id}
Name: ${student.name}
Course: ${student.course_name}`}
            />
          </div>

          <p className="mt-3 text-muted">
            ABC Institute of Technology
          </p>

          <button
            className="btn btn-success mt-3"
            onClick={() => window.print()}
          >
            Print / Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentIdCard;