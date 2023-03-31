import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import { hospitalDashboard } from "../../../utils/Constants";
import { useState, useEffect } from "react";

function HospitalDashboard() {
  const [doctors, setDoctors] = useState("");
  const id = Cookies.get("hospital_id");

  useEffect(() => {
    Count();
  }, []);

  const Count = () => {
    axios.get(`${hospitalDashboard}/${id}`).then((response) => {
      setDoctors(response.data.doctors);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-blue order-card">
            <div className="card-block">
              <h6 className="m-b-20 ">Doctor Count</h6>
              <h2 className="text-right">
                <i className="fa fa-hospital f-left"></i>
                <span>{doctors}</span>
              </h2>
              {/* <p className="m-b-0">
                Completed Orders<span className="f-right">351</span>
              </p> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 col-xl-3">
          <div className="card bg-c-green order-card">
            <div className="card-block">
              <h6 className="m-b-20">Booking Count</h6>
              <h2 className="text-right">
                <i className="fa fa-plus-square f-left"></i>
                <span>123</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HospitalDashboard;
