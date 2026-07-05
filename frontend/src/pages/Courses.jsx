import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [fees, setFees] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const res = await api.get("courses/");
      setCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCourse = async (e) => {
    e.preventDefault();

    try {
      await api.post("courses/", {
        name,
        fees,
      });

      setName("");
      setFees("");

      loadCourses();
      alert("Course added successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to add course");
    }
  };

  const deleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await api.delete(`courses/${id}/`);
        loadCourses();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Course Management</h2>

      {/* Add Course Form */}
      <form onSubmit={addCourse} className="mb-4">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <button className="btn btn-success w-100">
              Add Course
            </button>
          </div>
        </div>
      </form>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Course..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Course Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>₹{course.fees}</td>

                <td>
                  <Link
                    to={`/courses/edit/${course.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No courses found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;