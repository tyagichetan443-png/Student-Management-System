import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1>🎓 Student Management System</h1>
      <p className="lead">
        Manage students, courses and fees efficiently.
      </p>

      <div className="mt-4">
        <Link to="/dashboard" className="btn btn-dark me-2">
          Dashboard
        </Link>

        <Link to="/students" className="btn btn-primary me-2">
          Students
        </Link>

        <Link to="/students/add" className="btn btn-success me-2">
          Add Student
        </Link>

        <Link to="/courses" className="btn btn-warning me-2">
          Courses
        </Link>

        <Link to="/fees" className="btn btn-danger ">
          Fees Management
        </Link>

        <Link to="/attendance" className="btn btn-info m-2">
          Attendance
        </Link>
      </div>
    </div>
  );
}

export default Home;