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
      setUser(true);
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user && <Outlet />;
}

export default Auth;
