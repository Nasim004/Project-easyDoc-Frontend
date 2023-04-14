import "./viewDoctor.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { hospitaldetail, doctordetail } from "../../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";

function ViewDoctor() {
  const { id } = useParams();
  const [hospital, setHospital] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const navigate = useNavigate();

  const getHospitals = () => {
    axios.get(`${hospitaldetail}/${id}`).then((response) => {
      setHospital(response.data);
    });
  };

  const getDoctors = () => {
    axios.get(`${doctordetail}/${id}`).then((response) => {
      setDoctor(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getHospitals();
    getDoctors();
  }, []);

  return (
    <div className="container-fluid">
      <div
        className="card w-50 mx-auto mt-5 "
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 img-right">
              <img
                src="../../../Images/hospital2.jpg"
                style={{ width: "150px", height: "100px" }}
              />
            </div>
            <div className="col-md-6 align-self-center">
              <h3 className="card-title card-texts ">{hospital.name}</h3>
              <p className="card-texts  ">{hospital.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mt-3 d-flex justify-content-start">
        <div className="col-md-3">
          <select className="form-select" aria-label="Filter">
            <option selected>Filter by</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>
        <div className="col-md-3 ">
          <button type="button" className="btn btn-primary">
            Filter
          </button>
        </div>
      </div> */}

      <div className="container text-left">
        <div className="row">
          <label className=" text-secondary ">Select Doctors</label>
        </div>
      </div>
      <div className="row">
        {doctor.map((doc) => {
          return (
            <div className="col-md-6">
              <div
                className="card w-75 h-auto mx-auto"
                style={{ backgroundColor: "#d9d9d9" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3 ">
                      <img
                        src="../../../Images/doctor.png"
                        style={{ width: "30px", height: "30px" }}
                      />
                    </div>
                    <div className="col-md-9 text-left text-details">
                      <p>
                        Name :{" "}
                        <span className="font-weight-bold"> {doc.name}</span>{" "}
                      </p>
                      <p>Department : {}</p>
                      <p>
                        Experience :
                        <span className="font-weight-bold">
                          {" "}
                          {doc.experience} Years
                        </span>
                      </p>
                      <p>
                        Fee :{" "}
                        <span className="font-weight-bold"> ₹{doc.fee}</span>{" "}
                      </p>

                      <button
                        className="btn btn-dark btn-sm"
                        onClick={() => navigate(`/booking/${doc.id}`)}
                      >
                        Take Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewDoctor;
