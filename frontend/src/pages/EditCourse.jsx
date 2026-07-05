import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [fees, setFees] = useState("");

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const res = await api.get(`courses/${id}/`);
    setName(res.data.name);
    setFees(res.data.fees);
  };

  const updateCourse = async (e) => {
    e.preventDefault();

    await api.put(`courses/${id}/`, {
      name,
      fees,
    });

    alert("Course updated");
    navigate("/courses");
  };

  return (
    <div className="container mt-4">
      <h2>Edit Course</h2>

      <form onSubmit={updateCourse}>
        <input
          className="form-control mb-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Course Name"
        />

        <input
          className="form-control mb-2"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          placeholder="Fees"
        />

        <button className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditCourse;