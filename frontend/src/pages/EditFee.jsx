import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditFee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    payment_date: "",
    payment_mode: "Cash",
    remarks: "",
  });

  useEffect(() => {
    loadStudents();
    loadFee();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("students/");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFee = async () => {
    try {
      const res = await api.get(`fees/${id}/`);
      setFormData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`fees/${id}/`, formData);
      alert("Payment updated successfully!");
      navigate("/fees");
    } catch (error) {
      console.log(error);
      alert("Failed to update payment.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Fee Payment</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Student</label>
          <select
            className="form-control"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Payment Date</label>
          <input
            type="date"
            className="form-control"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Payment Mode</label>
          <select
            className="form-control"
            name="payment_mode"
            value={formData.payment_mode}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Remarks</label>
          <input
            type="text"
            className="form-control"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">
          Update Payment
        </button>
      </form>
    </div>
  );
}

export default EditFee;