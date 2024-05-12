import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      navigate(location.pathname === "/" ? "/studentlist" : location.pathname);
      setUser(true)
    } else {
      navigate("/login");
    }
  }, []);

  return user && <Outlet />;
}

export default Auth;
