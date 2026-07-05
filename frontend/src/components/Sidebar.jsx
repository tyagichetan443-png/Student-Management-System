import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaBook,
  FaMoneyBill,
  FaUserPlus,
  FaClipboardCheck,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        height: "100vh",
        background: "#0f172a",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px",
        color: "white",
      }}
    >
      <div className="text-center mb-5">
      <h4 className="fw-bold mb-O text-white">🎓 ABC</h4>
      <small className="text-light">
        Institute of Technology
      </small>
      </div>

      <div className="d-flex flex-column gap-3">
        <Link className="text-white text-decoration-none" to="/dashboard">
          <FaTachometerAlt /> Dashboard
        </Link>

        <Link className="text-white text-decoration-none" to="/students">
          <FaUserGraduate /> Students
        </Link>


        <Link className="text-white text-decoration-none" to="/students/add">
          <FaUserPlus /> Add Student
        </Link>

        <Link className="text-white text-decoration-none" to="/courses">
          <FaBook /> Courses
        </Link>

        

        <Link className="text-white text-decoration-none" to="/fees">
          <FaMoneyBill /> Fees
        </Link>

        <Link className="text-white text-decoration-none" to="/attendance">
          <FaClipboardCheck /> Attendance
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;