import { useEffect, useState } from "react";
import api from "../services/api";

function DailyCollection() {
  const [data, setData] = useState({
    total_collection: 0,
    payments: [],
  });

  useEffect(() => {
    fetchCollection();
  }, []);

  const fetchCollection = async () => {
    try {
      const res = await api.get("fees/daily-collection/");
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daily Collection Report</h2>

      <div className="card p-3 mb-4">
        <h4>Total Collection Today: ₹{data.total_collection}</h4>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Amount</th>
            <th>Payment Mode</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {data.payments && data.payments.length > 0 ? (
            data.payments.map((item, index) => (
              <tr key={index}>
                <td>{item.student_id}</td>
                <td>{item["student__name"]}</td>
                <td>₹{item.amount}</td>
                <td>{item.payment_mode}</td>
                <td>{item.payment_date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No collection today
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DailyCollection;