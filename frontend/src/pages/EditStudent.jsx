import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
// import Cropper from "react-cropper";
// import getCropedImage from "../utils/CropImage";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const [course, setCourse] = useState("");
  const [courses, setCourses] = useState([]);

  const [fees, setFees] = useState("");
  const [feeStatus, setFeeStatus] = useState("");

  const [photo, setPhoto] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState("");

  // const [image, setImage] = useState(null);
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  // const [showCropper, setShowCropper] = useState(false);  

  useEffect(() => {
    loadStudent();
    loadCourses();
  }, []);

  const loadStudent = async () => {
    const res = await api.get(`students/${id}/`);
    const data = res.data;

    setName(data.name);
    setEmail(data.email);
    setContact(data.contact);
    setAddress(data.address);
    setCourse(data.course);
    setFees(data.fees);
    setFeeStatus(data.fee_status);
    setCurrentPhoto(data.photo);
  };

  const loadCourses = async () => {
    const res = await api.get("courses/");
    const data = res.data.results ? res.data.results : res.data;
    setCourses(Array.isArray(data) ? data : []);
  };

  const updateStudent = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("course", course);
    formData.append("fees", fees);
    formData.append("fee_status", feeStatus);

    if (photo) {
      formData.append("photo", photo);
    }

    await api.put(`students/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Student updated successfully");
    navigate("/students");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">
        <h2 className="mb-4">Edit Student</h2>

        <form onSubmit={updateStudent}>


                    <div className="mb-3">
            <label className="fw-bold">Current Photo</label>
            <br />

            {currentPhoto ? (
              <img
                src={`http://127.0.0.1:8000${currentPhoto}`}
                alt="Student"
                width="120"
                height="120"
                className="rounded-circle mb-3"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <p>No photo uploaded</p>
            )}
          </div>

          <div className="mb-3">
            <label className="fw-bold">Upload New Photo</label>

            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <input
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />

          <input
            className="form-control mb-3"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact"
          />

          <textarea
            className="form-control mb-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />

          <select
            className="form-control mb-3"
            value={course}
            onChange={(e) => {
              const selectedId = e.target.value;
              setCourse(selectedId);

              const selectedCourse = courses.find(
                (c) => c.id === parseInt(selectedId)
              );

              if (selectedCourse) {
                setFees(selectedCourse.fees);
              }
            }}
          >
            <option value="">Select Course</option>

            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            className="form-control mb-3"
            value={fees}
            readOnly
          />

          <select
            className="form-control mb-3"
            value={feeStatus}
            onChange={(e) => setFeeStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>



          {photo && (
            <div className="mb-3">
              <label className="fw-bold">Preview</label>
              <br />

              <img
                src={URL.createObjectURL(photo)}
                alt="Preview"
                width="120"
                height="120"
                className="rounded-circle"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

          <button className="btn btn-success">
            Update Student
          </button>

        </form>
      </div>

    </div>
  );
}

export default EditStudent;


// import { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";


// const { id } = useParams();
// const navigate = useNavigate();

// const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [contact, setContact] = useState("");
// const [address, setAddress] = useState("");

// const [course, setCourse] = useState("");
// const [courses, setCourses] = useState([]);

// const [fees, setFees] = useState("");
// const [feeStatus, setFeeStatus] = useState("");

// const [photo, setPhoto] = useState(null);
// const [currentPhoto, setCurrentPhoto] = useState("");

// const [imageSrc, setImageSrc] = useState(null);
// const [crop, setCrop] = useState({ x: 0, y: 0 });
// const [zoom, setZoom] = useState(1);
// const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
// const [showCropper, setShowCropper] = useState(false);


// const loadStudent = async () => {
//   const res = await api.get(`students/${id}/`);
//   const data = res.data;

//   setName(data.name);
//   setEmail(data.email);
//   setContact(data.contact);
//   setAddress(data.address);
//   setCourse(data.course);
//   setFees(data.fees);
//   setFeeStatus(data.fee_status);
//   setCurrentPhoto(data.photo);
// };


// const onCropComplete = useCallback((croppedArea, croppedPixels) => {
//   setCroppedAreaPixels(croppedPixels);
// }, []);

// const handleImageSelect = (e) => {
//   if (!e.target.files.length) return;

//   const reader = new FileReader();

//   reader.onload = () => {
//     setImageSrc(reader.result);
//     setShowCropper(true);
//   };

//   reader.readAsDataURL(e.target.files[0]);
// };

// const saveCrop = async () => {
//   const croppedImage = await getCroppedImg(
//     imageSrc,
//     croppedAreaPixels
//   );

//   setPhoto(croppedImage);
//   setShowCropper(false);
// };