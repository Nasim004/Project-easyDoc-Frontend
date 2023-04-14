import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { hospitalSignup } from "../../../utils/Constants";
import Swal from "sweetalert2";
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registered Successfully",
          showConfirmButton: false,
          timer: 1000,
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
      setUsernameError("Must contain at least 4 letter");
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


    <MDBContainer fluid>
      <form onSubmit={handleSubmit}>
        <MDBCard className="text-black ">
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  REGISTER YOUR HOSPITAL
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={name}
                    onChange={handleNameChange}
                    label="Hospital Name"
                    id="form1"
                    type="text"
                    className="w-100"
                  />
                </div>
                <span className="text-danger">{nameError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={email}
                    onChange={handleEmailChange}
                    label="Email"
                    id="form2"
                    type="email"
                  />
                </div>
                <span className="text-danger">{emailError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={username}
                    onChange={handleUserameChange}
                    label="Username"
                    id="form3"
                    type="username"
                  />
                </div>
                <span className="text-danger">{usernameError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={admin_name}
                    onChange={handleAdminChange}
                    label="Admin Name"
                    id="form4"
                    type="text"
                  />
                </div>
                <span className="text-danger">{adminError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={admin_position}
                    onChange={handlePositionChange}
                    label="Admin Position"
                    id="form5"
                    type="text"
                  />
                </div>

                <span className="text-danger">{positionError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={phone}
                    onChange={handleNumberChange}
                    label="Contact Number"
                    id="form6"
                    type="text"
                  />
                </div>
                <span className="text-danger">{numberError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={district}
                    onChange={handleDistrictChange}
                    label=" District"
                    id="form7"
                    type="text"
                  />
                </div>
                <span className="text-danger">{districtError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={muncipality}
                    onChange={handleMuncipalityChange}
                    label=" Muncipality"
                    id="form8"
                    type="text"
                  />
                </div>
                <span className="text-danger">{muncipalityError}</span>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Description"
                    value={description}
                    onChange={handleDescriptionChange}
                    id="form9"
                    type="text"
                  />
                </div>
                <span className="text-danger">{descriptionError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={password}
                    onChange={handlePasswordChange}
                    label="Password"
                    id="form9"
                    type="password"
                  />
                </div>
                <span className="text-danger">{passwordError}</span>

                <MDBBtn className="mb-4" size="lg">
                  Register
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage src="../../../Images/Images 2.jpg" fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default HospitalSignup;
