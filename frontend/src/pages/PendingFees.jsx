import { useEffect, useState } from "react";
import api from "../services/api";

function PendingFees() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const res = await api.get("fees/pending-report/");
    setReport(res.data);
  };

  return (
    <div className="container mt-4">
      <h2>Pending Fees Report</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Total Fees</th>
            <th>Paid</th>
            <th>Remaining</th>
          </tr>
        </thead>

        <tbody>
          {report.map((r, index) => (
            <tr key={index}>
              <td>{r.student_id}</td>
              <td>{r.student_name}</td>
              <td>₹{r.total_fees}</td>
              <td>₹{r.paid_amount}</td>
              <td>₹{r.pending_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingFees;