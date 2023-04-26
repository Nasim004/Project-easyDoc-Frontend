import "./viewDoctor.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import {
  hospitaldetail,
  doctordetail,
  adminDepartments,
  adminDepartment,
} from "../../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

function ViewDoctor() {
  const { id } = useParams();
  const [hospital, setHospital] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const navigate = useNavigate();

  const getHospitals = () => {
    axios.get(`${hospitaldetail}/${id}`).then((response) => {
      setHospital(response.data);
    });
  };

  const getDeparments = () => {
    axios.get(adminDepartment).then((response) => {
      setDepartment(response.data);
    });
  };

  const getDoctors = () => {
    axios.get(`${doctordetail}/${id}`).then((response) => {
      //**************//
      const doctors = response.data;
      const promises = doctors.map((doc) => {
        return axios
          .get(`${adminDepartments}/${doc.department_id}`)
          .then((res) => {
            doc.department_name = res.data.name;
            return doc;
          });
      });
      Promise.all(promises).then((docWithDept) => {
        setDoctor(docWithDept);
      });
      // setDoctor(response.data);
      // console.log(response.data);
    });
  };

  const availableSwal = () => {
    Swal.fire("Doctor is not avilable");
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const filteredDoctors = selectedDepartment
  ? doctor.filter((doc) => doc.department_name === selectedDepartment)
  : doctor;

  useEffect(() => {
    getHospitals();
    getDoctors();
    getDeparments();
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

      <div className="row mt-3 d-flex justify-content-start">
        <div className="col-md-3">
          <select className="form-select" aria-label="Filter" value={selectedDepartment} onChange={handleDepartmentChange}>
            <option selected className="filter-heading">Filter By Department</option>
            {department.map((dep) => (
              <option key={dep.id} value={dep.name}>{dep.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="container text-left">
        <div className="row">
          <h5 className=" text-dark">Select Doctors</h5>
        </div>
      </div>
      <div className="row">
        {filteredDoctors.map((doc) => {
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
                      <p>Department : {doc.department_name}</p>
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
                      {doc.is_available ? (
                        <button
                          className="btn btn-dark btn-sm"
                          onClick={() => navigate(`/booking/${doc.id}`)}
                        >
                          Take Appointment
                        </button>
                      ) : (
                        <button
                          disabled
                          className="btn btn-dark btn-sm"
                          onClick={() => availableSwal()}
                        >
                          Not Available
                        </button>
                      )}
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
