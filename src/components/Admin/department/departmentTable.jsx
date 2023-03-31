import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { FaTrash } from "react-icons/fa";
import {
  addDepartment,
  adminDepartment,
  deleteDepartment,
} from "../../../utils/Constants";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function DepartmentList() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    getDepartmentList();
  }, []);

  const getDepartmentList = () => {
    axios.get(adminDepartment).then((response) => {
      setDepartment(response.data);
    });
  };

  const department_add = (e) => {
    const data = JSON.stringify({
      name,
    });
    axios
      .post(addDepartment, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        Swal.fire("Department Added");
        getDepartmentList();
        // navigate("");
      })
      .catch((err) => {
        Swal.fire(Response.status);
      });
  };

  const deleteDept = (id) => {
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
          .delete(`${deleteDepartment}/${id}`)
          .then((res) => {
            getDepartmentList();
            Swal.fire("Deleted", "Department has been deleted", "Success");
          })
          .catch((err) => {
            Swal.fire("Not Deleted");
          });
      }
    });
  };

  const addAndclose = () => {
    department_add();
    handleClose();
  };

  return (
    <div className="container-fluid  mt-5">
      <div className="row">
        <div className="col-md-6">
          <Button
            className="primary d-flex justify-content-start mb-3"
            onClick={handleShow}
          >
            Add Department
          </Button>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Department Name</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {department.map((dep, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{dep.name}</td>
                  <td>
                    <Link>
                      <div
                        onClick={() => deleteDept(dep.id)}
                        className="department_delete"
                      >
                        <FaTrash />
                      </div>
                    </Link>
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
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="email"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Department Name"
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={addAndclose}>
                Add Department
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default DepartmentList;
