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
import { userSignup } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import "./userRegister.css";
import swal from 'sweetalert2';

function UserSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [muncipality, setMuncipality] = useState("");
  const [numberError, setNumberError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [muncipalityError, setMuncipalityError] = useState("");



  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if ((name.length !== 3) &&  (email.length !==3) && (muncipality.length !==3) && (district.length !==3) && (password.length !==5))  {
      swal("Please Fill All Details"); 
    }
    else{
      const data = JSON.stringify({
        name,
        email,
        phone,
        muncipality,
        district,
        password,
      });
      e.preventDefault();
      axios
        .post(userSignup, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log(response.status);
          navigate("/login");
        });
    }
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
    if (!/^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{5}$/.test(e.target.value)) {
      setPasswordError("Password length must contains 5 letters and 2 digits");
    } else {
      setPasswordError("");
    }
  };

  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit}>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center abc"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  REGISTER
                </p>
                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Your Full Name"
                    value={name}
                    onChange={handleNameChange}
                    id="form1"
                    type="text"
                    className="w-100"
                  />
                </div>
                <span className="text-danger">{nameError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    id="form2"
                    type="email"
                  />
                </div>
                <span className="text-danger">{emailError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Your Mobile Number"
                    value={phone}
                    onChange={handleNumberChange}
                    id="form5"
                    type="text"
                  />
                </div>
                <span className="text-danger">{numberError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Your District"
                    value={district}
                    onChange={handleDistrictChange}
                    id="form6"
                    type="text"
                  />
                </div>
                <span className="text-danger">{districtError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Your Muncipality"
                    value={muncipality}
                    onChange={handleMuncipalityChange}
                    id="form9"
                    type="text"
                  />
                </div>
                <span className="text-danger">{muncipalityError}</span>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    label="Password"
                    id="form3"
                    value={password}
                    onChange={handlePasswordChange}
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
                <MDBCardImage src="../../../Images/Image1.jpg" fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default UserSignup;
