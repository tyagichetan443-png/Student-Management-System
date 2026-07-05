import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function StudentAttendance() {
  const { id } = useParams();

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);

  const getAttendance = async () => {
    if (!month || !year) {
      alert("Please select month and year");
      return;
    }

    try {
      const res = await api.get(
        `attendance/student/${id}/${year}/${month}/`
      );

      setSummary({
        total: res.data.total_days,
        present: res.data.present_days,
        absent: res.data.absent_days,
        percentage: res.data.percentage,
      });

      setAttendance(res.data.attendance);
    } catch (error) {
      console.log(error);
      alert("No attendance found.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Monthly Attendance</h2>

      <div className="row mb-3">
        <div className="col-md-4">
        <input
            type="month"
            className="form-control"
            onChange={(e) => {
            const [y, m] = e.target.value.split("-");
            setYear(y);
            setMonth(Number(m));
            }}
        />
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-primary"
            onClick={getAttendance}
          >
            Search
          </button>
        </div>
      </div>

      {summary && (
        <div className="card p-3 mb-4">
          <h5>Total Days : {summary.total}</h5>
          <h5>Present : {summary.present}</h5>
          <h5>Absent : {summary.absent}</h5>
          <h5>Attendance % : {summary.percentage}%</h5>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.length > 0 ? (
            attendance.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>
                  <span
                    className={
                      item.status === "Present"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="text-center">
                No attendance found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;