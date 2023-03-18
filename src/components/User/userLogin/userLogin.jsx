import React, { useState } from "react";
import axios from "../../../utils/axios";
import { useDispatch } from "react-redux";
import { change } from "../../../Redux/emailReducer";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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
import { userLogin } from "../../../utils/Constants";
import { useNavigate } from "react-router-dom";

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
          Cookies.set("role",String(response.data.role))
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(change(response.data.payload.email));
          navigate("/");
          
        }
      });
  };

  return (
    <MDBContainer fluid>
      <form onSubmit={handleLogin}>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Login
                </p>

                <div className="d-flex flex-row align-items-center mb-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    label="Email"
                    id="form1"
                    type="text"
                    name="email"
                    className="w-100"
                  />
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    label="Password"
                    id="form3"
                    name="password"
                    type="password"
                  />
                </div>

                <MDBBtn type="submit" className="mb-4" size="lg">
                  Login
                </MDBBtn>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center  "
              >
                <MDBCardImage
                  className="loginpageimage"
                  src="../../../Images/Image1.jpg"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default UserLogin;
