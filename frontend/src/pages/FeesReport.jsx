import { useEffect, useState } from "react";
import api from "../services/api";

function FeesReport() {
  const [report, setReport] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    const res = await api.get("fees/report/");
    setReport(res.data);
  };

  return (
    <div className="container mt-4">
      <h2>All Fee Payments Report</h2>

     <button
        className="btn btn-danger mb-3"
        onClick={() =>
            window.open(
            "http://127.0.0.1:8000/api/fees/report-pdf/",
            "_blank"
            )
        }
        >
        Export PDF
        </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Mode</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r) => (
            <tr key={r.id}>
                <td>{r["student__id"]}</td>
              <td>{r["student__name"]}</td>
              <td>₹{r.amount}</td>
              <td>{r.payment_date}</td>
              <td>{r.payment_mode}</td>
              <td>{r.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeesReport;