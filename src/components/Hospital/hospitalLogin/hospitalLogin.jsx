import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../utils/axios";
import { hospitalLogin } from "../../../utils/Constants";
import { change } from "../../../Redux/usernameReducer";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./hopitalLogin.css";


function HospitalLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      username,
      password,
    });
    axios
      .post(hospitalLogin, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data == "Authentication Failed") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Authentication Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Cookies.set("jwt-hospital", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          Cookies.set("hospital_id", String(response.data.id));
          dispatch(change(response.data.payload.username));
          navigate("/hospital/panel");
        }
      });
  };

  return (
    <section className="get-in-touch">
      <h6 className="title">Login</h6>
      <form className="contact-form row" onSubmit={handleLogin}>
        <div className="row d-flex justify-content-center">
          <div className="form-field col-lg-6">
            <input
              id="name"
              className="input-text js-input"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label className="label" for="name">
              Username
            </label>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="form-field col-lg-6 ">
            <input
              id="name"
              className="input-text js-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label className="label" for="name">
              Password
            </label>
          </div>
        </div>
        <div className="form-field col-lg-12">
          <input className="submit-btn" type="submit" />
        </div>
      </form>
    </section>
  );
}
export default HospitalLogin;
