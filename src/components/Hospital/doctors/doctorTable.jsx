import { Table, Form, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { adminDepartments } from "../../../utils/Constants";
import Swal from "sweetalert2";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import {
  addDoctor,
  adminDepartment,
  doctorlist,
  doctorAvailable,
} from "../../../utils/Constants";
import Switch from "@material-ui/core/Switch";
import toast from "react-hot-toast";
import './doctorTable.css'; 


function DoctorsList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [department, setDepartment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [department_id, setDepartmentId] = useState("");
  const [tokens, setTokens] = useState("");
  const [fee, setFee] = useState("");
  const [departments, setDepartments] = useState([]);

  const hospital_id = Cookies.get("hospital_id");

  const addAndclose = () => {
    doctor_add();
    handleClose();
  };

  const doctor_add = (e) => {
    if (
      !name ||
      !experience ||
      !tokens ||
      !hospital_id ||
      !department_id ||
      !fee
    ) {
      toast.error("Doctor Not Added ,Fill All details", {
        autoClose: 40000,
      });
    }

    const data = JSON.stringify({
      name,
      experience,
      tokens,
      hospital_id,
      department_id,
      fee,
    });
    axios
      .post(addDoctor, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.success("Doctor Added", {
          autoClose: 40000,
        });
      });
  };

  const getDepartmentList = () => {
    axios.get(adminDepartment).then((response) => {
      setDepartment(response.data);
    });
  };

  function handleDepartmentId(id) {
    setDepartmentId(id);
  }

  const DoctorList = () => {
    axios.get(`${doctorlist}/${hospital_id}`).then((response) => {
      const doctors = response.data;
      const promises = doctors.map((doct) => {
        return axios
          .get(`${adminDepartments}/${doct.department_id}`)
          .then((res) => {
            doct.department_name = res.data.name;
            return doct;
          });
      });
      Promise.all(promises).then((doctWithDept) => {
        setDoctor(doctWithDept);
      });
    });
  };

  const doctorAvailablity = (id) => {
    axios.put(`${doctorAvailable}/${id}`).then((response) => {
      DoctorList();
      toast.success("Availablity Updated", {
        autoClose: 40000,
      });
    });
  };

  useEffect(() => {
    getDepartmentList();
    DoctorList();
  }, []);

  return (
    <div className="container-fluid m-5">
      <div className="row">
        <div className="col-md-6">
          <Button
            className="primary d-flex justify-content-start mb-3"
            onClick={handleShow}
          >
            Add Doctor
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Doctor Name</th>
                <th>Experience</th>
                <th>Available Tokens</th>
                <th>Department</th>
                <th>Fee</th>
                <th>Available</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {doctor.map((doc, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.experience}</td>
                  <td>{doc.tokens.join(", ")}</td>
                  <td>{doc.department_name}</td>
                  <td>{doc.fee}</td>
                  <td>{doc.is_available ? "Yes" : "No"}</td>
                  <td>
                    {doc.is_available ? (
                      <Switch
                        onClick={() => doctorAvailablity(doc.id)}
                        defaultChecked
                        color="default"
                      />
                    ) : (
                      <Switch
                        onClick={() => doctorAvailablity(doc.id)}
                        color="default"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="modalheading">Name</Form.Label>
                  <Form.Control className="modalsubheading"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Eg:Xavier"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="modalheading">Experience</Form.Label>
                  <Form.Control className="modalsubheading"
                    type="number"
                    value={experience}
                    onChange={(e) => {
                      setExperience(e.target.value);
                    }}
                    placeholder="Eg:2"
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="modalheading">Token</Form.Label>
                  <Form.Control className="modalsubheading"
                    type="text"
                    value={tokens}
                    onChange={(e) => {
                      setTokens(e.target.value);
                    }}
                    placeholder="Eg : 1,2,3,4"
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="modalheading">Doctor Fee</Form.Label>
                  <Form.Control className="modalsubheading"
                    type="text"
                    value={fee}
                    onChange={(e) => {
                      setFee(e.target.value);
                    }}
                    placeholder="Eg: 200"
                  />
                </Form.Group>

                <Dropdown as={ButtonGroup}>
                  <Button variant="primary">Department</Button>

                  <Dropdown.Toggle
                    split
                    variant="primary"
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    {department.map((dep) => (
                      <Dropdown.Item
                        key={dep.id}
                        onClick={() => handleDepartmentId(dep.id)}
                      >
                        {dep.name}
                      </Dropdown.Item>
                    ))}
                    ;
                  </Dropdown.Menu>
                </Dropdown>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addAndclose}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
export default DoctorsList;
