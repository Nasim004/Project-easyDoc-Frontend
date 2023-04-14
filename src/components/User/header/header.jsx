import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "../../../utils/axios";
import { verifyToken } from "../../../utils/Constants";
import { useEffect } from "react";
import { change } from "../../../Redux/usernameReducer";
import { logout } from "../../../Redux/usernameReducer";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("inside useEffect");
    const token = Cookies.get("jwt_user");
    if (token) {
      axios
        .post(
          verifyToken,
          { token },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log(res.data.username);
          console.log(res.data.id);
          dispatch(change(res.data.username));
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, []);

  const username = useSelector((state) => state.username.username);

  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const userlogout = () => {
    Cookies.remove("jwt_user");
    Cookies.remove("role", "user");
    Cookies.remove("id");
    dispatch(logout());
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand className="easydoc" style={{ fontSize: 30 }} href="#home">
          easyDoc
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
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
          </Navbar.Text> */}

          <Navbar.Text>
            {username ? (
              <span style={{ display: "flex" }}>
                <NavDropdown.Item>
                  <Link to='hospitals'>Hospitals</Link>
                </NavDropdown.Item>
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/myprofile">My Profile</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <Button variant="dark outline-dark btn-rounded">
                  <Link className="userRegister" onClick={userlogout}>
                    Logout
                  </Link>
                </Button>
              </span>
            ) : (
              <span style={{ display: "flex" }}>
                <NavDropdown.Item>
                  <Link to='hospitals'>Hospitals</Link>
                </NavDropdown.Item>
                <Button variant="dark btn-rounded" className="loginButton">
                  <Link className="userLogin" to="/login">
                    Login
                  </Link>
                </Button>

                <Button variant="dark outline-dark btn-rounded">
                  <Link className="userRegister" to="/signup">
                    Register
                  </Link>
                </Button>
              </span>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
