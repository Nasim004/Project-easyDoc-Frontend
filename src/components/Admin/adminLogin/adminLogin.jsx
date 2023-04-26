import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../../../utils/axios";
import { change } from "../../../Redux/emailReducer";
import { adminLogin } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      email,
      password,
    });
    axios
      .post(adminLogin, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (
          response.data.status === "Wrong Password" ||
          response.data.status === "Email is not found"
        ) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email or Password is incorrect",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (response.data.status === "Not A Admin Account") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Not a Admin Account",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Cookies.set("jwt-admin", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 500,
          });
          dispatch(change(response.data.payload.email));
          navigate("/admin/panel");
        }
      });
  };

  return (
    <section className="get-in-touch">
      <h6 className="title">Admin Login</h6>
      <form className="contact-form row" onSubmit={handleLogin}>
        <div className="row d-flex justify-content-center">
          <div className="form-field col-lg-6">
            <input
              id="name"
              className="input-text js-input"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label className="label" for="name">
              Email
            </label>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="form-field col-lg-6 ">
            <input
              id="password"
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

export default AdminLogin;
