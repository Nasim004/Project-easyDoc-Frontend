import "./profile.css";
import axios from "../../../utils/axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { userDetail } from "../../../utils/Constants";
import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userprofileUpdate, changepassword } from "../../../utils/Constants";
import Swal from "sweetalert2";
import { useCallback } from "react";
function MyProfile() {
  const id = Cookies.get("id");
  const [details, setDetails] = useState("");
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloses = () => setShows(false);
  const handleShow = () => setShow(true);
  const handleShows = () => setShows(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [muncipality, setMuncipality] = useState("");
  const [district, setDistrict] = useState("");
  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");

  const userDetails = useCallback(() => {
    axios.get(`${userDetail}/${id}`).then((response) => {
      setDetails(response.data);
    });
  }, [id]);

  useEffect(() => {
    userDetails();
  }, [userDetails]);

  const profileUpdate = (e) => {
    const data = JSON.stringify({
      name,
      email,
      phone,
      muncipality,
      district,
    });
    axios
      .put(`${userprofileUpdate}/${id}`, data, {
        headers: { "Content-Type": "appliation/json" },
      })
      .then(() => {
        Swal.fire("Updated");
      })
      .catch((response) => {
        Swal.fire(response.data);
      });
    handleClose();
  };

  const passwordChange = () => {
    const data = JSON.stringify({
      oldpassword,
      newpassword,
    });
    axios
      .put(`${changepassword}/${id}`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        Swal.fire(response.data);
      })
      .catch((response) => {
        Swal.fire(response.data);
      });
    handleClose();
  };

  return (
    <>
      <section className="bg-light">
        <div className="container ">
          <div className="col-md-6 mb-4 mb-sm-5">
            <div className="card card-style1 border-0 ">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="col-md-6 px-xl-10">
                  <ul className=" list-unstyled align-items-start flex-column">
                    <li className="mb-2 mb-xl-3 ">
                      <span className="display-26 text-dark me-2 font-weight-600">
                        Name:{details[0]?.name}
                      </span>
                    </li>
                    <li className="mb-2 mb-xl-3 ">
                      <span className="display-26 text-dark me-2 font-weight-600">
                        Email:{details[0]?.email}
                      </span>
                    </li>
                    <li className="mb-2 mb-xl-3 ">
                      <span className="display-26 text-dark me-2 font-weight-600">
                        Phone:{phone}
                      </span>
                    </li>
                    <li className="mb-2 mb-xl-3 ">
                      <span className="display-26 text-dark me-2 font-weight-600">
                        Muncipality:{details[0]?.muncipality}
                      </span>
                    </li>
                    <li className="mb-2 mb-xl-3 ">
                      <span className="display-26 text-dark me-2 font-weight-600">
                        District:{details[0]?.district}
                      </span>
                    </li>

                    <div className="row">
                      <Button
                        className="primary d-flex justify-content-center mb-3"
                        onClick={handleShow}
                      >
                        Edit Profile
                      </Button>
                      <Button
                        className="primary d-flex justify-content-center mb-3"
                        onClick={handleShows}
                      >
                        Change Password
                      </Button>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={details[0]?.name}
                  placeholder=" Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={details[0]?.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder=" Name"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  defaultValue={details[0]?.phone}
                  onChange={(e) => {
                    setPhone(e.target.defaultValue);
                  }}
                  type="text"
                  placeholder=" Name"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Muncipality</Form.Label>
                <Form.Control
                  defaultValue={details[0]?.muncipality}
                  onChange={(e) => {
                    setMuncipality(e.target.value);
                  }}
                  type="text"
                  placeholder=" Name"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>District</Form.Label>
                <Form.Control
                  defaultValue={details[0]?.district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  type="text"
                  placeholder=" Name"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={profileUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={shows} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  value={oldpassword}
                  onChange={(e) => {
                    setOldpassword(e.target.value);
                  }}
                  type="text"
                  placeholder="Old Password"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  value={newpassword}
                  onChange={(e) => {
                    setNewpassword(e.target.value);
                  }}
                  type="text"
                  placeholder=" New Password"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloses}>
              Close
            </Button>
            <Button variant="primary" onClick={passwordChange}>
              Change
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
export default MyProfile;
