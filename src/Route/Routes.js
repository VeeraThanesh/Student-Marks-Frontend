import React from 'react'
import LoginPage from "../Components/LogIn/LoginPage";
import StudentList from "../Components/Contant/StudentList";
import StudentDetails from "../Components/Contant/StudentDetails";
import AddStudents from "../Components/Contant/AddStudents";
import CutOff from "../Components/Contant/CutOff";
import SignUp from "../Components/Signup/SignUp";
import Auth from "../Components/Auth/Auth";
import { useRoutes } from 'react-router-dom';

function Routes() {
    const router = useRoutes([
        {
          path: "/login",
          element: <LoginPage />
        },
        {
          path: "/signup",
          element: <SignUp />
        },
        {
          path: "/",
          element: <Auth />,
          children: [
            {
              path: "/studentlist",
              element: <StudentList />
            },
            {
              path: "/studentdetails",
              element: <StudentDetails />
            },
            {
              path: "/addstudent",
              element: <AddStudents />
            },
            {
              path: "/cutoff",
              element: <CutOff />
            },
            {
              path: "/view/:id",
              element: <StudentDetails />
            },
            {
              path: "/edit/:id",
              element: <AddStudents />
            }
          ]
        }
      ])
  return router
}

export default Routes