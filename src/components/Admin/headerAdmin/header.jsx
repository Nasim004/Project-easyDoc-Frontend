import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./header.css";
import { FaUser, FaBuilding, FaHospitalUser,FaBell } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import React, { useState, useEffect } from 'react';


function Header() {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    if (logout) {
      Cookies.remove("jwt-admin");
      Cookies.remove("role", "admin");
      navigate("/admin/login");
    }
  }, [logout, navigate]);

  const handleLogout = () => {
    setLogout(true);
  };
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="easydoc" href="/admin/panel">
          easyDoc Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content">
          <Navbar.Text className="justify-content-around">
            <Link to="/admin/hospital" className="hospital">
              <Button variant="outline-dark m-3">
                <FaBuilding />
                Hospitals
              </Button>
            </Link>
            {/* <Button variant="outline-dark m-3">
              <FaHospitalUser /> Doctors
            </Button> */}
            <Link to="/admin/department" className="department">
              <Button variant="outline-dark m-3">
                <FaHospitalUser /> Departments
              </Button>
            </Link>
            <Link to="/admin/user">
              <Button variant="outline-dark m-3">
                <FaUser /> Users
              </Button>
            </Link>


            <Link to='#' className="logout" onClick={handleLogout}>
              <Button variant="outline-dark m-3">Logout</Button>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
