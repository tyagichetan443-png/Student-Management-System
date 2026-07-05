import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [students, setStudents] = useState(0);
  const [courses, setCourses] = useState(0);
  const [totalFees, setTotalFees] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentsRes = await api.get("students/");
      const coursesRes = await api.get("courses/");

      setStudents(studentsRes.data.length);
      setCourses(coursesRes.data.length);

      const fees = studentsRes.data.reduce(
        (sum, student) => sum + Number(student.fees),
        0
      );

      setTotalFees(fees);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>

      <div className="row">

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Total Students</h5>
              <h2>{students}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Total Courses</h5>
              <h2>{courses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>Total Fees</h5>
              <h2>₹{totalFees}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;