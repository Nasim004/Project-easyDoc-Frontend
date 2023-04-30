import "./adminPanel.css";
import axios from "../../../utils/axios";
import { adminDashboard, doctorAvailable } from "../../../utils/Constants";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const [user, setUser] = useState("");
  const [hospital, setHospital] = useState("");
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    Count();
  }, []);

  const Count = () => {
    axios.get(adminDashboard).then((response) => {
      setUser(response.data.users);

      setHospital(response.data.hospital);
      setDoctor(response.data.doctors);
      setDepartment(response.data.departments);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-blue order-card">
            <div className="card-block">
              <h6 className="m-b-20 ">Hospital Count</h6>
              <h2 className="text-right">
                <i className="fa fa-hospital f-left"></i>
                <span>{hospital}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-green order-card">
            <div className="card-block">
              <h6 className="m-b-20">Departments Count</h6>
              <h2 className="text-right">
                <i className="fa fa-plus-square f-left"></i>
                <span>{department}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-yellow order-card">
            <div className="card-block">
              <h6 className="m-b-20">Users Count</h6>
              <h2 className="text-right">
                <i className="fa fa-user f-left"></i>
                <span>{user}</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-pink order-card">
            <div className="card-block">
              <h6 className="m-b-20">Doctors Count</h6>
              <h2 className="text-right">
                <i className="fa fa-user-md f-left"></i>
                <span>{doctor}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
