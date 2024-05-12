import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import left_img from "../../Assets/Images/left-img2.jpg";

function SignUp() {
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
  const [errorMessage, setErrorMessage] = useState(false);
  const [apiError, setApiError] = useState(false);

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      setLoginErrors(validate(loginState));
      setErrorMessage(true);
      const response = await axios.post(
        "https://student-marks-backend.vercel.app/api/v1/user/createUser",
        loginState
      );

      console.log(response, "response");

      if (response) {
        setApiError(false);
        console.log("Success");
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400) {
        setApiError(true);
      }
      console.log(error);
    }
  };

  const validate = (value) => {
    const errors = {};

    if (!isNaN(value.userName) || value.userName?.trim() === "") {
      errors.userName = "User Name *";
    }
    if (!value.password) {
      errors.password = "Enter Password *";
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
            <h3>User Register</h3>
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
            {apiError ? (
              <span className="apiError">User Already Exist</span>
            ) : null}
            <button onClick={handleSignUp}>Register</button>
            <p onClick={() => navigate("/login")}>Already have an account ?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
