import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import {verifyToken} from '../../../utils/Constants'
import { useEffect } from "react";

function Header() {
  useEffect(() => {
    const token = Cookies.get("jwt-user");
    if (token) {
      axios
        .post(verifyToken, JSON.stringify({ token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res.data.name);
        })
        .catch((err) => {
          console.log("Error");
        });
    }
  }, []);

  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch;
  const logout = () => {
    Cookies.remove("jwt_user");
    Cookies.remove("role", "user");
    dispatch({ type: "logout" });
    navigate("/signup");
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="easydoc" href="#home">
          easyDoc
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {auth ? (
              <span>
                <Button variant="outline-dark btn-rounded">
                  <Link className="userRegister" onClick={logout}>
                    Logout
                  </Link>
                </Button>
              </span>
            ) : (
              <span>
                <Link className="userRegister" to="/signup">
                  Register /{" "}
                </Link>
                <Link className="userLogin" to="/login">
                  Login
                </Link>
              </span>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
