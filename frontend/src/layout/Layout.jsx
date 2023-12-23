
import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
        <header className="d-flex align-items-center justify-content-between">
            <h3 className="">Book Store</h3>
            <div className="d-flex gap-3">
                <NavLink to={"/home"}>Home</NavLink>
                <NavLink to={"/auth/login"}>Login</NavLink>
                <NavLink to={"/auth/registration"}>Registration</NavLink>
            </div>
        </header>

      <Outlet />
    </div>
  );
};

export default Layout;
