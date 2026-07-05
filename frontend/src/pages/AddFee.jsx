import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddFee() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    amount: "",
    payment_date: "",
    payment_mode: "Cash",
    remarks: "",
  });

  useEffect(() => {
    loadStudents();
    loadFees();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await api.get("students/");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadFees = async () => {
    try {
      const res = await api.get("fees/");
      setFees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "student") {
      const student = students.find(
        (s) => s.id === parseInt(value)
      );

      setSelectedStudent(student);
      setFormData((prev) => ({
        ...prev,
        student: value,
        amount: "",
      }));
    }
  };

  const paidAmount = selectedStudent
    ? fees
        .filter((f) => f.student === selectedStudent.id)
        .reduce((sum, f) => sum + Number(f.amount), 0)
    : 0;

  const remainingAmount = selectedStudent
    ? Number(selectedStudent.fees) - paidAmount
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (remainingAmount <= 0) {
      alert("This student's fees are already fully paid.");
      return;
    }

    if (Number(formData.amount) > remainingAmount) {
      alert(
        `Only ₹${remainingAmount} fees are remaining.`
      );
      return;
    }

    try {
      await api.post("fees/", formData);

      alert("Payment added successfully!");

      navigate("/fees");
    } catch (error) {
      console.log(error);
      alert("Failed to add payment.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">Make Payment</h2>

        <form onSubmit={handleSubmit}>
          {/* Student Dropdown */}
          <div className="mb-3">
            <label className="form-label">
              Student
            </label>

            <select
              name="student"
              className="form-select"
              value={formData.student}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Information */}
          {selectedStudent && (
            <div className="alert alert-info">
              <p>
                <strong>Total Fees:</strong> ₹
                {selectedStudent.fees}
              </p>

              <p>
                <strong>Paid:</strong> ₹
                {paidAmount}
              </p>

              <p>
                <strong>Remaining:</strong> ₹
                {remainingAmount}
              </p>
            </div>
          )}

          {/* Amount */}
          <div className="mb-3">
            <label className="form-label">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              max={remainingAmount}
              required
            />
          </div>

          {/* Payment Date */}
          <div className="mb-3">
            <label className="form-label">
              Payment Date
            </label>

            <input
              type="date"
              name="payment_date"
              className="form-control"
              value={formData.payment_date}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Mode */}
          <div className="mb-3">
            <label className="form-label">
              Payment Mode
            </label>

            <select
              name="payment_mode"
              className="form-select"
              value={formData.payment_mode}
              onChange={handleChange}
            >
              <option value="Cash">
                Cash
              </option>
              <option value="UPI">
                UPI
              </option>
              <option value="Card">
                Card
              </option>
              <option value="Bank Transfer">
                Bank Transfer
              </option>
            </select>
          </div>

          {/* Remarks */}
          <div className="mb-3">
            <label className="form-label">
              Remarks
            </label>

            <textarea
              name="remarks"
              className="form-control"
              rows="3"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Monthly installment, first payment, etc."
            />
          </div>

          {/* Fully Paid Message */}
          {selectedStudent &&
            remainingAmount <= 0 && (
              <div className="alert alert-success">
                ✅ Fees already paid in full.
              </div>
            )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-success"
            disabled={
              !selectedStudent ||
              remainingAmount <= 0
            }
          >
            Save Payment
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFee;