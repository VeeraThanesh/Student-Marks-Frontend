import React, { useEffect, useState } from "react";
import "./StudentDetails.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import logo_img from "../../Assets/Images/logo.png";
import certificate_img from "../../Assets/Images/certificate.png";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    studentName: "",
    fatherName: "",
    email: "",
    dob: "",
    rollNo: "",
    result: "",
    tamil: "",
    english: "",
    mathematics: "",
    biology: "",
    physics: "",
    chemistry: "",
    totalMark: "",
    totalCutOff: "",
  });

  useEffect(() => {
    if (id !== undefined) {
      getUser();
    }
  }, []);
  console.log(id);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://student-marks-backend.vercel.app/api/v1/student/getStudent/${id}`
      );
      console.log(response);
      if (response.data && response.data.data) {
        setFormState((prevalue) => {
          return {
            ...prevalue,
            studentName: response.data.data.studentName,
            fatherName: response.data.data.fatherName,
            email: response.data.data.email,
            dob: response.data.data.dob,
            rollNo: response.data.data.rollNo,
            result: response.data.data.result,
            tamil: response.data.data.tamil,
            english: response.data.data.english,
            mathematics: response.data.data.mathematics,
            biology: response.data.data.biology,
            physics: response.data.data.physics,
            chemistry: response.data.data.chemistry,
            totalMark: response.data.data.totalMark,
            totalCutOff: response.data.data.totalCutOff,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="studentdetail-container">
        <div className="studentdetail-content">
          <div className="studentdetail-top">
            <div className="logo-design">
              <img src={logo_img} alt="Logo" />
              <h1>
                SMART <span>College</span>
              </h1>
              <img src={certificate_img} alt="Certificate" />
            </div>
            <div className="top-detail">
              <h4>
                <span>Website:</span>
                www.smartcollege.com
              </h4>
              <h4>
                Since : <span>2024</span>
              </h4>
            </div>
          </div>
          <div className="studentdetail-middle">
            <div className="studentdetail-left">
              <table>
                <tr>
                  <th>Student Name :</th>
                  <th>Father Name :</th>
                  <th>Email :</th>
                </tr>
                <tr>
                  <td>{formState.studentName}</td>
                  <td>{formState.fatherName}</td>
                  <td>{formState.email}</td>
                </tr>
              </table>
            </div>
            <div className="studentdetail-right">
              <table>
                <tr>
                  <th>D.O.B :</th>
                  <th>Roll.No :</th>
                  <th>Result :</th>
                </tr>
                <tr>
                  <td>{formState.dob}</td>
                  <td>{formState.rollNo}</td>
                  <td>{formState.result}</td>
                </tr>
              </table>
            </div>
          </div>
          <div className="studentdetail-bottom">
            <div className="top-row">
              <h4>Subjects</h4>
              <hr />
              <h4>Marks Obtained</h4>
            </div>
            <table>
              <tr className="left-row">
                <th>Tamil</th>
                <th>English</th>
                <th>Mathematics</th>
                <th>Biology</th>
                <th>Physics</th>
                <th>Chemistry</th>
              </tr>
              <tr className="right-row">
                <td>{formState.tamil}</td>
                <td>{formState.english}</td>
                <td>{formState.mathematics}</td>
                <td>{formState.biology}</td>
                <td>{formState.physics}</td>
                <td>{formState.chemistry}</td>
              </tr>
            </table>
          </div>

          <div className="cutoff-total">
            <div className="cutoff-check">
              <h3>Cut Off</h3>
              <button
                onClick={() => {
                  navigate("/cutoff");
                }}
              >
                {formState.totalCutOff}
              </button>
            </div>
            <div className="mark-total">
              <h3>Total</h3>
              <h5>{formState.totalMark}/600</h5>
            </div>
          </div>
          <div className="back-btn">
            <button
              onClick={() => {
                navigate("/studentlist");
              }}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentDetails;
