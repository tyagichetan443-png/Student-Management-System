import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("profile/");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const[profile, setProfile] = useState({
    username: "",
    email: "",
    role: ""
  });

  return (
    <div className="container mt-4">
      <h2>Admin Profile</h2>

      <div className="card p-4">
        <h5>Username: {profile.username}</h5>
        <h5>Email: {profile.email}</h5>
        <h5>Role: {profile.role}</h5>
      </div>
    </div>
  );
}

export default Profile;