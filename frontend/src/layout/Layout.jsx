import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import Toast and ToastContainer components
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify styles

const Layout = () => {
  return (
    <div>
      <header className="d-flex align-items-center justify-content-between">
        <h3 className="">Book Store</h3>
        <div className="d-flex gap-3">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/auth/login"}>Login</NavLink>
          <NavLink to={"/auth/registration"}>Registration</NavLink>
        </div>
      </header>
      <ToastContainer position="top-right" autoClose={3000} />

      <Outlet />
    </div>
  );
};

export default Layout;
