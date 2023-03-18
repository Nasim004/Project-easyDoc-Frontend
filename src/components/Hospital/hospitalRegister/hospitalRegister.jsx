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

  const [name,setName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [admin_name,setAdmin] = useState("");
  const [admin_position,setPosition] = useState("");
  const [muncipality, setMuncipality] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  
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
      password,
    })
    e.preventDefault();
    axios.post(hospitalSignup , data,{
      headers : {"Content-Type":"application/json"}
    })
    .then((response) =>{
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registered Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/hospital/login")
    });
  };

  return (
    <MDBContainer fluid>
      <form >
        <MDBCard className="text-black " >
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
                    onChange={(e)=>{
                      setName(e.target.value);
                    }}
                    label="Hospital Name"
                    id="form1"
                    type="text"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}
                    label="Email"
                    id="form2"
                    type="email"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={username}
                    onChange={(e)=>{
                      setUsername(e.target.value);
                    }}
                    label="Username"
                    id="form3"
                    type="username"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={admin_name}
                    onChange={(e)=>{
                      setAdmin(e.target.value);
                    }}
                    label="Admin Name"
                    id="form4"
                    type="text"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={admin_position}
                    onChange={(e)=>{
                      setPosition(e.target.value);
                    }}
                    label="Admin Position"
                    id="form5"
                    type="text"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={phone}
                    onChange={(e)=>{
                      setPhone(e.target.value);
                    }}
                    label="Contact Number"
                    id="form6"
                    type="text"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={district}
                    onChange={(e)=>{
                      setDistrict(e.target.value);
                    }}
                    label=" District"
                    id="form7"
                    type="text"
                  />
                </div>
                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={muncipality}
                    onChange={(e)=>{
                      setMuncipality(e.target.value);
                    }}
                    label=" Muncipality"
                    id="form8"
                    type="text"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon=" me-3" size="lg" />
                  <MDBInput
                    value={password}
                    onChange={(e)=>{
                      setPassword(e.target.value);
                    }}
                    label="Password"
                    id="form9"
                    type="password"
                  />
                </div>

                <MDBBtn className="mb-4" size="lg" onClick={handleSubmit}>
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
