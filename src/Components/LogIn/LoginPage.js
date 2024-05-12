import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import left_img from "../../Assets/Images/left-img.jpg";

function LoginPage() {
  const [loginState, setLoginState] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginState((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };

  const [loginErrors, setLoginErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [apiError, setApiError] = useState(false);

  const handlelogin = async (e) => {
    try {
      e.preventDefault();
      setLoginErrors(validate(loginState));
      setErrorMessage(true);
      setIsSubmit(true);

      const response = await axios.post(
        "https://student-marks-backend.vercel.app/api/v1/user/login",
        loginState
      );
      if (response) {
        navigate("/studentlist");
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      console.log(isSubmit);
      alert("Login Successfully");
    } catch (error) {
      console.error(error, "error");
      if (error?.response?.status === 400) {
        setApiError(true);
      }
      console.log(error);
    }
  };

  const validate = (value) => {
    const errors = {};

    if (!isNaN(value.userName) || value.userName?.trim() === "") {
      errors.userName = "User Name *";
      setIsSubmit(false);
    }
    if (!value.password) {
      errors.password = "Enter Password *";
      setIsSubmit(false);
    } else if (value.userName && value.password) {
      setIsSubmit(true);
    }
    return errors;
  };

  return (
    <>
      <div className="login-main">
        <div className="login-left">
          <img src={left_img} alt="Company Img" />
        </div>
        <div className="login-right">
          <div className="login-right-main">
            <h3>User LogIn</h3>
            <div className="input-feild">
              <input
                type="text"
                name="userName"
                minLength={3}
                maxLength={10}
                required={true}
                placeholder="Enter UserName"
                value={loginState.userName}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="login-error-message">{loginErrors.userName}</p>
              ) : (
                ""
              )}
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                required={true}
                minLength={6}
                maxLength={10}
                value={loginState.password}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="login-error-message">{loginErrors.password}</p>
              ) : (
                ""
              )}
            </div>
            <h5>Forget Password ?</h5>
            {apiError ? (
              <span className="apiError-login">Invalid credentials</span>
            ) : null}
            <button onClick={handlelogin}>LogIn</button>
            <p onClick={() => navigate("/signup")}>Create an account</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
