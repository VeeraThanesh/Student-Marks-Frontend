import React from "react";
import "./AddStudents.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

function AddStudents() {
  const navigate = useNavigate();
  const { id } = useParams();
  const initialVal = {
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
  };

  useEffect(() => {
    if (id !== undefined) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [studentData, setStudentData] = useState(initialVal);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const save = async (e) => {
    try {
      console.log(studentData);
      if (id !== undefined) {
        const response = await axios.put(
          `https://student-marks-backend.vercel.app/api/v1/student/updateStudent/${id}`,
          studentData
        );
        console.log(response);
        // alert("Student Updated Successfully");
      } else {
        e.preventDefault();
        setFormErrors(validate(studentData));
        setErrorMessage(true);
        setIsSubmit(true);
        const response = await axios.post(
          "https://student-marks-backend.vercel.app/api/v1/student/createStudent",
          studentData
        );
        console.log(response);
        // alert("Student Created Successfully")
      }
      if (isSubmit) {
        navigate("/studentlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://student-marks-backend.vercel.app/api/v1/student/getStudent/${id}`
      );
      console.log(response);
      if (response.data && response.data.data) {
        setStudentData((prevalue) => {
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
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validate = (value) => {
    const errors = {};

    if (!isNaN(value.studentName) || value.studentName?.trim() === "") {
      errors.studentName = "Enter Student Name *";
      setIsSubmit(false);
    }
    if (!isNaN(value.fatherName) || value.fatherName?.trim() === "") {
      errors.fatherName = "Enter FatherName *";
      setIsSubmit(false);
    }
    if (!value.email) {
      errors.email = "Email id required!";
      setIsSubmit(false);
    }
    if (!value.dob) {
      errors.dob = "Select Date of Birth *";
      setIsSubmit(false);
    }
    if (!value.rollNo) {
      errors.rollNo = "Enter RollNo *";
      setIsSubmit(false);
    }
    if (!value.result || !isNaN(value.result)) {
      errors.result = "Enter the Result *";
      setIsSubmit(false);
    }
    if (!value.tamil || isNaN(value.tamil)) {
      errors.tamil = "Mark *";
      setIsSubmit(false);
    }
    if (!value.english || isNaN(value.english)) {
      errors.english = "Mark *";
      setIsSubmit(false);
    }
    if (!value.mathematics || isNaN(value.mathematics)) {
      errors.mathematics = "Mark *";
      setIsSubmit(false);
    }
    if (!value.biology || isNaN(value.biology)) {
      errors.biology = "Mark *";
      setIsSubmit(false);
    }
    if (!value.physics || isNaN(value.physics)) {
      errors.physics = "Mark *";
      setIsSubmit(false);
    }
    if (!value.chemistry || isNaN(value.chemistry)) {
      errors.chemistry = "Mark *";
      setIsSubmit(false);
    } else if (
      value.StudentName &&
      value.FatherName &&
      value.email &&
      value.dob &&
      value.rollNo &&
      value.result &&
      value.tamil &&
      value.english &&
      value.mathematics &&
      value.biology &&
      value.physics &&
      value.chemistry
    ) {
      setIsSubmit(true);
    }
    return errors;
  };
  return (
    <>
      <div className="addStudent-container">
        <div className="addStudent-content">
          <div>
            <IoCloseCircleOutline
              className="close-addstudent"
              onClick={() => {
                navigate("/studentlist");
              }}
            />
            <h2>STUDENT DETAILS</h2>
          </div>
          <div className="addStudent-top">
            <div className="label-input">
              <label htmlFor="">Students Name</label>
              <input
                type="text"
                placeholder="Student Name"
                name="studentName"
                minLength={3}
                maxLength={10}
                value={studentData.studentName}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.studentName}</p>
              ) : (
                ""
              )}
            </div>
            <div className="label-input">
              <label htmlFor="">Father Name</label>
              <input
                type="text"
                placeholder="Father Name"
                name="fatherName"
                minLength={3}
                maxLength={10}
                value={studentData.fatherName}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.fatherName}</p>
              ) : (
                ""
              )}
            </div>
            <div className="label-input">
              <label htmlFor="">E-mail</label>
              <input
                type="email"
                placeholder="e-mail"
                name="email"
                value={studentData.email}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.email}</p>
              ) : (
                ""
              )}
            </div>
            <div className="label-input">
              <label htmlFor="">D.O.B</label>
              <input
                type="date"
                name="dob"
                id=""
                min={"2000-01-01"}
                value={studentData.dob}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.dob}</p>
              ) : (
                ""
              )}
            </div>

            <div className="label-input">
              <label htmlFor="">Roll.No</label>
              <input
                type="number"
                placeholder="Enter Roll No"
                name="rollNo"
                minLength={1}
                maxLength={2}
                value={studentData.rollNo}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.rollNo}</p>
              ) : (
                ""
              )}
            </div>
            <div className="label-input">
              <label htmlFor="">Result</label>
              <select
                name="result"
                id=""
                className="result-option"
                value={studentData.result}
                onChange={handleChange}
              >
                <option value="" disabled selected hidden>
                  Select Result
                </option>
                <option value="Pass">Pass</option>
                <option value="Fail">Fail</option>
              </select>
              {errorMessage ? (
                <p className="error-message">{formErrors.result}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="subject-mark">
            <h4>Subjects / Marks</h4>
          </div>
          <div className="addStudent-bottom">
            <div className="mark-input">
              <label htmlFor="">Tamil</label>
              <input
                type="number"
                placeholder="Tamil Mark"
                name="tamil"
                maxLength={5}
                value={studentData.tamil}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.tamil}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mark-input">
              <label htmlFor="">Mathematics</label>
              <input
                type="number"
                placeholder="Mathematics Mark"
                name="mathematics"
                maxLength={5}
                value={studentData.mathematics}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.mathematics}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mark-input">
              <label htmlFor="">English</label>
              <input
                type="number"
                placeholder="English Mark"
                name="english"
                maxLength={5}
                value={studentData.english}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.english}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mark-input">
              <label htmlFor="">Physics</label>
              <input
                type="number"
                placeholder="Physics Mark"
                name="physics"
                maxLength={5}
                value={studentData.physics}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.physics}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mark-input">
              <label htmlFor="">Biology</label>
              <input
                type="number"
                placeholder="Biology Mark"
                name="biology"
                maxLength={5}
                value={studentData.biology}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.biology}</p>
              ) : (
                ""
              )}
            </div>
            <div className="mark-input">
              <label htmlFor="">Chemistry</label>
              <input
                type="number"
                placeholder="Chemistry Mark"
                name="chemistry"
                minLength={5}
                maxLength={15}
                value={studentData.chemistry}
                onChange={handleChange}
              />
              {errorMessage ? (
                <p className="error-message">{formErrors.chemistry}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <button onClick={save} className="create-btn">
            {" "}
            {id !== undefined ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddStudents;
