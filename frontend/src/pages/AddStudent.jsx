// import api from "../services/api";
// import { useNavigate } from "react-router-dom";
// import{useEffect,useState} from "react";

// function AddStudent() {
//   const [name, setName] = useState("");
//   const [course, setCourse] = useState("");
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [contact, setContact] = useState("");
//   const [address, setAddress] = useState("");
//   const [admission_date, setAdmission_date] = useState("");
//   const[fees, setFees] = useState("");
//   const[feeStatus, setFeeStatus] = useState("Pending");


//   const navigate = useNavigate();

//   useEffect(() => {
//   loadCourses();
// }, []);

// const loadCourses = async () => {
//   try {
//     const res = await api.get("courses/");
//     setCourses(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       await api.post("students/", {
//         name,
//         email ,
//         contact ,
//         address ,
//         admission_date,
//         course: Number(course),
//         fees: Number(fees),
//         fee_status: feeStatus
//       });

//       alert("Student added successfully!");

//       // redirect back to students list
//       navigate("/students");
//     } catch (error) {
//       console.log("FULL ERROR:", error);
//       console.log("RESPONSE:", error.response);
//       alert("Error adding student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Add Student</h2>

//       <form onSubmit={handleSubmit} className="mt-3">

//         <div className="mb-3">
//           <label>Name</label>
//           <input
//             type="text"
//             className="form-control"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
// <label>Course</label>
//         <select
//         className="form-control"
//         value={course}
//         onChange={(e) => {
//             const selectedId = e.target.value;
//             setCourse(selectedId);

//             const selectedCourse = courses.find(c => c.id == selectedId);
//             if (selectedCourse) {
//             setFees(selectedCourse.fees);
//             }
//         }}
//         required
//         >
//         <option value="">Select Course</option>

//         {courses.map((c) => (
//             <option key={c.id} value={c.id}>
//             {c.name}
//             </option>
//         ))}
//         </select>


//         <div className="mb-3">
//         <label>Admission Date</label>
//         <input
//             type="date"
//             className="form-control"
//             value={admission_date}
//             onChange={(e) => setAdmission_date(e.target.value)}
//             required
//         />
//         </div> 

//         <div className="mb-3">
//         <label>Fees</label>
//         <input
//             type="number"
//             className="form-control"
//             value={fees}
//             readOnly
//         />
//         </div>
// <label>Fee Status</label>
//         <select
//             className="form-control mb-2"
//             value={feeStatus}
//             onChange={(e) => setFeeStatus(e.target.value)}
//           >
//             <option value="Pending">Pending</option>
//             <option value="Paid">Paid</option>
//           </select>

//         <div className="mb-3">
//         <label>Email</label>
//         <input
//             type="email"
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//         />
//         </div>

//         <div className="mb-3">
//         <label>Contact</label>
//         <input
//             type="text"
//             className="form-control"
//             value={contact}
//             onChange={(e) => setContact(e.target.value)}
//             required
//         />
//         </div>

//         <div className="mb-3">
//         <label>Address</label>
//         <textarea
//             className="form-control"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             required
//         />
//         </div>

//         <button className="btn btn-primary" disabled={loading}>
//           {loading ? "Saving..." : "Add Student"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddStudent;



import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AddStudent() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [admission_date, setAdmission_date] = useState("");
  const [fees, setFees] = useState("");
  const [feeStatus, setFeeStatus] = useState("Pending");

  // Photo
  const [photo, setPhoto] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("admission_date", admission_date);
      formData.append("course", course);
      formData.append("fees", fees);
      formData.append("fee_status", feeStatus);

      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("students/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Student added successfully!");
      navigate("/students");

    } catch (error) {
      console.log(error);
      alert("Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">
        <h2 className="mb-4">Add Student</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Course</label>

            <select
              className="form-control"
              value={course}
              onChange={(e) => {
                const selectedId = e.target.value;
                setCourse(selectedId);

                const selectedCourse = courses.find(
                  (c) => c.id == selectedId
                );

                if (selectedCourse) {
                  setFees(selectedCourse.fees);
                }
              }}
              required
            >
              <option value="">Select Course</option>

              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Admission Date</label>

            <input
              type="date"
              className="form-control"
              value={admission_date}
              onChange={(e) => setAdmission_date(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Fees</label>

            <input
              type="number"
              className="form-control"
              value={fees}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label>Fee Status</label>

            <select
              className="form-control"
              value={feeStatus}
              onChange={(e) => setFeeStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contact</label>

            <input
              type="text"
              className="form-control"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Address</label>

            <textarea
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Student Photo</label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />

            {photo && (
              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                className="mt-3 rounded-circle"
                width="120"
                height="120"
                style={{ objectFit: "cover" }}
              />
            )}
          </div>

          <button
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Student"}
          </button>

        </form>
      </div>

    </div>
  );
}

export default AddStudent;