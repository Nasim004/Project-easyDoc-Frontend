import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { change } from "../../../Redux/emailReducer";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import "./userLogin.css";
import { userLogin } from "../../../utils/Constants";

function UserLogin() {
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
      .post(userLogin, data, {
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
        } else {
          Cookies.set("jwt_user", String(response.data.jwt));
          Cookies.set("role", String(response.data.role));
          Cookies.set("id", String(response.data.id));
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
          dispatch(change(response.data.payload.email));
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

export default UserLogin;
