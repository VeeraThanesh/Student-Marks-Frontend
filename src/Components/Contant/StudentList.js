import React, { useEffect, useState } from "react";
import "./StudentList.css";
import Navbar from "../Layout/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

function StudentList() {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const response = await axios.get(
        "https://student-marks-backend.vercel.app/api/v1/student/getAllStudents"
      );
      console.log(response.data.data);
      if (response.data && response.data.data) {
        setRowData([...response.data.data]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://student-marks-backend.vercel.app/api/v1/student/deleteStudent/${id}`
      );
      console.log(response.data.data);
      if (response.data && response.data) {
        getList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(rowData);
  return (
    <>
      <div className="studentlist-container">
        <Navbar />
        <div className="student-content">
          {rowData?.length > 0 ? (
            rowData?.map((element) => (
              <div className="student-details">
                <MdDelete
                  className="studentdelete-btn"
                  onClick={() => deleteUser(element._id)}
                />
                <table>
                  <tr>
                    <th>Name :</th>
                    <th>Email :</th>
                    <th>D.O.B :</th>
                    <th>Result :</th>
                  </tr>
                  <tr>
                    <td>{element.studentName}</td>

                    <td>{element.email}</td>
                    <td>{element.dob}</td>
                    <td>{element.result}</td>
                  </tr>
                </table>

                <button
                  className="full-detailbtn"
                  onClick={() => {
                    navigate(`/view/${element._id}`, { state: element });
                  }}
                >
                  Full Details
                </button>
              </div>
            ))
          ) : (
            <p className="connect-backend">No Data or Connect Backend</p>
          )}
        </div>
      </div>
    </>
  );
}

export default StudentList;
