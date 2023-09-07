import React from "react";
import { logo } from "../constants/logo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../helpers/persistence-storage";
import { logoutUser } from "../slice/auth";
const Navbar = () => {
  const { loggedin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-1 mb-4 border-bottom container">
      <Link to={"/"}>
        <div>
          <img src={logo} width={100} />
        </div>
      </Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggedin ? (
          <>
            <p className="me-3 m-0 py-2 text-dark text-decoration-none">
              {user.username}
            </p>
            <button
              className="btn btn-outline-secondary  text-dark"
              onClick={() => navigate("/createArticle")}
              style={{ margin: "0 10px 0 0" }}
            >
              Create Article
            </button>
            <button className="btn btn-outline-danger" onClick={logOutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="me-3 py-2 link-body-emphasis text-decoration-none"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
