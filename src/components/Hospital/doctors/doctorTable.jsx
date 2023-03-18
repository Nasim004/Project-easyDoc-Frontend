import { Table, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import {
  hospitalDoctorAdd,
  hospitalDoctor,
  hospitalDoctorDelete,
} from "../../../utils/Constants";
import Swal from "sweetalert2";

function DoctorsList() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [tokens, setTokens] = useState("");
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    getDoctorList();
  });

  const getDoctorList = () => {
    axios.get(hospitalDoctor).then((response) => {
      setDoctor(response.data);
    });
  };

  const deleteDoctor = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${hospitalDoctorDelete}/${id}`)
          .then((res) => {
            getDoctorList();

            Swal.fire("Deleted!", "Doctor has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Not Deleted!");
            console.log(err);
          });
      }
    });
  };

  const handleSubmit = (e) => {
    const data = JSON.stringify({
      name,
      department,
      tokens,
    });
    e.preventDefault();
    axios.post(hospitalDoctorAdd, data, {
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="container-fluid m-5">
      <div className="row">
        <div className="col-md-6 col-sm-3">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Doctor Name</th>
                <th>Department</th>
                <th>Available Tokens</th>
                <th>Availablity</th>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {doctor.map((obj, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{obj.name}</td>
                  <td>{obj.department}</td>
                  <td>{obj.available_tokens}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Availablity
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-2">
                          Available
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Not Available
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Link>
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <Link >
                    <div onClick={() => deleteDoctor(obj.id)} className="deletedoctor" >
                    <FaTrash />
                    </div>
                      
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="col-md-4 col-sm-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Doctor Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Doctor Name"
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicText">
              <Form.Label>Department </Form.Label>
              <Form.Control
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                type="text"
                placeholder="Enter Doctor Department"
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Available Tokens</Form.Label>
              <Form.Control
                value={tokens}
                onChange={(e) => {
                  setTokens(e.target.value);
                }}
                type="text"
                placeholder="Enter Available Tokens"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Doctor
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default DoctorsList;
