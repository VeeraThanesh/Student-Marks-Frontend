import React from "react";
import "./Navbar.css";
import { TbLogout } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <h3>Smart College</h3>
        <div className="navbar-contant">
          <ul>
            <li
              onClick={() => {
                navigate("/cutoff");
              }}
            >
              Cut Off
            </li>
            <li
              onClick={() => {
                navigate("/addstudent");
              }}
            >
              <button className="nav-addbtn">Add Students</button>
            </li>
          </ul>
          <div className="user-dropdown">
            <button className="user-btn">
              <FaRegUserCircle />
            </button>
            <div className="user-dropdown-content">
              <div className="user-info">
                <FaRegUserCircle className="user-icon" />
                <p>Admin</p>
              </div>
              <hr />
              <a href="">
                LogOut{" "}
                <TbLogout
                  className="logout-icon"
                  onClick={() => {
                    handleLogOut();
                  }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
