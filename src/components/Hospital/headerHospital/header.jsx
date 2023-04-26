import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./header.css";
import { FaBook, FaBuilding,} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const navigate = useNavigate();
  const [logout,setLogout]=useState(false);

  useEffect(()=>{
    if(logout){
      Cookies.remove("jwt-hospital");
      Cookies.remove("role")
      Cookies.remove("hospital_id")
      navigate("/hospital/login")
    }
  },[logout,navigate]);
  const handleLogout=()=>{
    setLogout(true);
  }
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="easydoc" href="#home">
          <Link to="/hospital/panel" className="easydoc">
            easyDoc Hospital Admin Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-">
          <Navbar.Text className="justify-content-around">
            <Button variant="outline-dark m-3 ">
              <Link to="/hospital/doctor">
                <FaBuilding /> Doctors
              </Link>
            </Button>
            <Button variant="outline-dark m-3">
              <Link to="/hospital/appointments">
              <FaBook /> Bookings
              </Link>
            </Button>
            <Button variant="outline-dark m-3">
              <Link className="logout" onClick={handleLogout}>
                Logout
              </Link>
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
