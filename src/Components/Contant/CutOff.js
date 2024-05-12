import React from "react";
import "./CutOff.css";
import { useNavigate } from "react-router-dom";

function CutOff() {
  const navigate = useNavigate();

  return (
    <>
      <div className="cutoff-container">
        <div className="cutoff-content">
          <h2>Cut-Off</h2>
          <table>
            <tr>
              <th>Mathematics</th>
              <th>Physics</th>
              <th>Chemistry</th>
            </tr>
            <tr>
              <td>Mark / 2</td>
              <td>Mark / 2</td>
              <td>Mark / 2</td>
            </tr>
          </table>
          <div className="cutoff-total">
            <button
              className="cut-off-backbtn"
              onClick={() => {
                navigate("/studentlist");
              }}
            >
              Back
            </button>
            <h4>150</h4>
            <button
              className="cut-off-checkbtn"
              onClick={() => {
                navigate("/addstudent");
              }}
            >
              Check Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CutOff;
