import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/")
      .then((res) => setCourses(res.data));
  }, []);

  const loadStudents = (courseId) => {
    axios
      .get(`http://127.0.0.1:8000/api/students/course/${courseId}/`)
      .then((res) => setStudents(res.data));
  };

  const handleStatus = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  const saveAttendance = () => {
    const data = students.map((s) => ({
      student: s.id,
      date: new Date().toISOString().split("T")[0],
      status: attendance[s.id] || "Absent",
    }));

    axios
      .post("http://127.0.0.1:8000/api/attendance/mark/", data)
      .then(() => alert("Attendance Saved"));
  };

  return (
    <div>
      <h2>Mark Attendance</h2>

      <select onChange={(e) => loadStudents(e.target.value)}>
        <option>Select Course</option>

        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <br /><br />

      {students.map((s) => (
        <div key={s.id}>
          {s.name}

          <input
            type="radio"
            name={s.id}
            onChange={() => handleStatus(s.id, "Present")}
          />
          Present

          <input
            type="radio"
            name={s.id}
            onChange={() => handleStatus(s.id, "Absent")}
          />
          Absent
        </div>
      ))}

      <br />

      {students.length > 0 && (
        <button onClick={saveAttendance}>
          Save Attendance
        </button>
      )}
    </div>
  );
}

export default Attendance;