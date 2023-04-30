import React from "react";
import { useState } from "react";
import { userSignup } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import "./userRegister.css";
import toast from "react-hot-toast";

function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    if (nameError || emailError || numberError || passwordError) {
      toast.error("Please fix details correctly.", {
        autoClose: 20000,
      });
      return;
    }

    if (!name || !email || !phone || !password) {
      toast.error("Please fill all the required fields.", {
        autoClose: 20000,
      })
      return;
    }

    const data = JSON.stringify({
      name,
      email,
      phone,
      password,
    });
    e.preventDefault();
    axios
      .post(userSignup, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.error(response.data, {
          autoClose: 40000,
        });
        navigate("/login");
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!/^[A-Za-z]{3,}$/.test(e.target.value)) {
      setNameError("Must contain at least 3 letters and no numbers");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError("");
    }
  };

  const handleNumberChange = (e) => {
    setPhone(e.target.value);
    if (!/^\d{10}$/.test(e.target.value)) {
      setNumberError("Phone Number is not valid");
    } else {
      setNumberError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
      setPasswordError("Password length must contains 5 letters and 1 number ");
    } else {
      setPasswordError("");
    }
  };

  return (
    <section className="get-in-touch">
      <h1 className="title">Register Your Account</h1>
      <form className="contact-form row" onSubmit={handleSubmit}>
        <div className="form-field col-lg-6">
          <input
            id="name"
            className="input-text js-input"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <label className="label" for="name">
            Name
          </label>
          <span className="text-danger">{nameError}</span>
        </div>
        <div className="form-field col-lg-6">
          <input
            id="name"
            className="input-text js-input"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="label" for="name">
            Email
          </label>
          <span className="text-danger">{emailError}</span>
        </div>
        <div className="form-field col-lg-6">
          <input
            id="name"
            className="input-text js-input"
            type="text"
            value={phone}
            onChange={handleNumberChange}
          />
          <label className="label" for="name">
            Mobile Number
          </label>
          <span className="text-danger">{numberError}</span>
        </div>
        <div className="form-field col-lg-6">
          <input
            id="name"
            className="input-text js-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <label className="label" for="name">
            Password
          </label>
          <span className="text-danger">{passwordError}</span>
        </div>

        <div className="form-field col-lg-12">
          <input className="submit-btn" type="submit" value="register" />
        </div>
      </form>
    </section>
  );
}

export default UserSignup;
