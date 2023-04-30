import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { hospitalSignup } from "../../../utils/Constants";
import "./hospitalRegister.css";
import toast from "react-hot-toast";
import { useEffect } from "react";

function HospitalSignup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [admin_name, setAdmin] = useState("");
  const [admin_position, setPosition] = useState("");
  const [muncipality, setMuncipality] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [muncipalityError, setMuncipalityError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    if (
      nameError ||
      emailError ||
      numberError ||
      passwordError ||
      muncipalityError ||
      descriptionError ||
      districtError ||
      adminError ||
      positionError
    ) {
      toast.error("Please fix details correctly.", {
        autoClose: 20000,
      });
      return;
    }
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !district ||
      !muncipality ||
      !description ||
      !admin_name ||
      !admin_position
    ) {
      toast.error("Please fill all the required fields.", {
        autoClose: 20000,
      });
      return;
    }
    const data = JSON.stringify({
      name,
      username,
      email,
      phone,
      admin_name,
      admin_position,
      muncipality,
      district,
      description,
      password,
    });
    e.preventDefault();
    axios
      .post(hospitalSignup, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {

        toast.success("Registered succesfully.You can login when admin approve your account", {
          autoClose: 40000,
        });

        navigate("/hospital/login");
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!/^[A-Za-z ]{4,}$/.test(e.target.value)) {
      setNameError("Must contain at least 3 letters and no numbers");
    } else {
      setNameError("");
    }
  };
  const handleUserameChange = (e) => {
    setUsername(e.target.value);
    if (!/^[A-Za-z][A-Za-z0-9_]{4,10}$/.test(e.target.value)) {
      setUsernameError("Must min 4 and max 10 letter");
    } else {
      setUsernameError("");
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
  const handleAdminChange = (e) => {
    setAdmin(e.target.value);
    if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
      setAdminError("Must contain at least 3 letters and no numbers");
    } else {
      setAdminError("");
    }
  };
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
      setPositionError("Must contain at least 3 letters and no numbers");
    } else {
      setPositionError("");
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
  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
      setDistrictError("Must contain at least 3 letters and no numbers");
    } else {
      setDistrictError("");
    }
  };
  const handleMuncipalityChange = (e) => {
    setMuncipality(e.target.value);
    if (!/^[A-Za-z]{4,}$/.test(e.target.value)) {
      setMuncipalityError("Must contain at least 3 letters and no numbers");
    } else {
      setMuncipalityError("");
    }
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value)) {
      setPasswordError(
        "Password length must be 5 with letter only and 1 number"
      );
    } else {
      setPasswordError("");
    }
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (!/^[A-Za-z ]{10,}$/.test(e.target.value)) {
      setDescriptionError("Must contain at least 10 letters and no numbers");
    } else {
      setDescriptionError("");
    }
  };

  return (
    <section className="get-in-touch">
      <h1 className="title">Register Your Hospital</h1>
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
            Hospital Name
          </label>
          <span className="text-danger">{nameError}</span>
        </div>

        <div className="form-field col-lg-6 ">
          <input
            id="email"
            className="input-text js-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <label className="label" for="email">
            Email
          </label>
          <span className="text-danger">{emailError}</span>
        </div>

        <div className="form-field col-lg-6 ">
          <input
            id="company"
            className="input-text js-input"
            type="text"
            value={username}
            onChange={handleUserameChange}
          />
          <label className="label" for="company">
            Username
          </label>
          <span className="text-danger">{usernameError}</span>
        </div>
        <div className="form-field col-lg-6 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={phone}
            onChange={handleNumberChange}
          />
          <label className="label" for="phone">
            Contact Number
          </label>
          <span className="text-danger">{numberError}</span>
        </div>
        <div className="form-field col-lg-6">
          <input
            id="message"
            className="input-text js-input"
            type="text"
            value={admin_name}
            onChange={handleAdminChange}
          />
          <label className="label" for="message">
            Admin
          </label>
          <span className="text-danger">{adminError}</span>
        </div>
        <div className="form-field col-lg-6 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={admin_position}
            onChange={handlePositionChange}
          />
          <label className="label" for="phone">
            Admin Position
          </label>
          <span className="text-danger">{positionError}</span>
        </div>
        <div className="form-field col-lg-6 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={muncipality}
            onChange={handleMuncipalityChange}
          />
          <label className="label" for="phone">
            Municpality
          </label>
          <span className="text-danger">{muncipalityError}</span>
        </div>
        <div className="form-field col-lg-6 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={district}
            onChange={handleDistrictChange}
          />
          <label className="label" for="phone">
            District
          </label>
          <span className="text-danger">{districtError}</span>
        </div>
        <div className="form-field col-lg-12 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={description}
            onChange={handleDescriptionChange}
          />
          <label className="label" for="phone">
            Description About Hospital{" "}
          </label>
        </div>
        <span className="text-danger">{descriptionError}</span>
        <div className="form-field col-lg-6 ">
          <input
            id="phone"
            className="input-text js-input"
            type="text"
            value={password}
            onChange={handlePasswordChange}
          />
          <label className="label" for="phone">
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

export default HospitalSignup;
