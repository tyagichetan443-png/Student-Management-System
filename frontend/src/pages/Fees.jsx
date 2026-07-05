import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Fees() {
  const [fees, setFees] = useState([]);

  useEffect(() => {
    loadFees();
  }, []);

  const loadFees = async () => {
    try {
      const res = await api.get("fees/");
      setFees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFee = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await api.delete(`fees/${id}/`);
        loadFees();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Fees Management</h2>

        <Link
          to="/fees/add"
          className="btn btn-success"
        >
          Make Payment
        </Link>
      </div>

      {/* Reports Buttons */}
      <div className="mb-4">
        <Link
          to="/fees/reports"
          className="btn btn-primary me-2"
        >
          All Reports
        </Link>

        <Link
          to="/fees/pending"
          className="btn btn-danger me-2"
        >
          Pending Fees
        </Link>

        <Link
          to="/fees/daily"
          className="btn btn-info"
        >
          Daily Collection
        </Link>
      </div>

      <table className="table table-bordered table-striped shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Student</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Mode</th>
            <th>Remarks</th>
            <th>Fee Receipt</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fees.length > 0 ? (
            fees.map((fee) => (
              <tr key={fee.id}>
                <td>{fee.id}</td>

                <td>
                  {fee.student_name || fee.student}
                </td>

                <td>₹{fee.amount}</td>
                <td>{fee.payment_date}</td>
                <td>{fee.payment_mode}</td>
                <td>{fee.remarks}</td>
                <td>
                <button
                className="btn btn-success btn-sm"
                onClick={() =>
                window.open(
                    `http://127.0.0.1:8000/api/fees/receipt/${fee.id}/`,
                    "_blank"
                )
                }
            >
                Receipt
            </button>
            </td>

                <td>
                  <Link
                    to={`/fees/edit/${fee.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteFee(fee.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="7"
                className="text-center"
              >
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Fees; 