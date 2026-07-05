// import Navbar from "./Navbar";
// import { Outlet } from "react-router-dom";

// function MainLayout() {
//   return (
//     <div>
//       <Navbar />
//       <div className="container mt-3">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default MainLayout;


import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
          background: "#f4f7fc",
        }}
      >
        <Navbar />

        <div className="container-fluid p-4">
          <Outlet />
        </div>
      </div>
      </>
  );
}

export default MainLayout;