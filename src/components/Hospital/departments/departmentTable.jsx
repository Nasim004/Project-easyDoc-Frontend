import axios from "../../../utils/axios";
import { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { hospitalDepartmentAdd } from "../../../utils/Constants";
import { useEffect } from "react";
import {hospitalDepartment} from "../../../utils/Constants"

function DepartmentList() {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [head, setHead] = useState("");
  const [department, setDepartment] = useState([]);


  useEffect(() => {
    getDepartmentList();
  });

  const getDepartmentList = () => {
    axios.get(hospitalDepartment).then((response) => {
      setDepartment(response.data);
    });
  };

  const handleSubmit = (e) => {
    const data = JSON.stringify({
      name,
      count,
      head,
    });
    e.preventDefault();
    axios.post(hospitalDepartmentAdd, data, {
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="container-fluid m-5">
      <div className="row">
        <div className="col-md-6">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Department Name</th>
                <th>Doctors Count</th>
                <th>Department Head</th>
                <td>Edit</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              {department.map((obj,index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{obj.name}</td>
                  <td>{obj.count}</td>
                  <td>{obj.head}</td>
                  <td>
                    <Link>
                      <FaEdit />
                    </Link>
                  </td>
                  <td>
                    <Link>
                      <FaTrash />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="col-md-6">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1" controlId="formBasicEmail">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Enter Department Name"
              />
            </Form.Group>

            <Form.Group className="mb-1" controlId="formBasicText">
              <Form.Label>Doctors Count </Form.Label>
              <Form.Control
                value={count}
                onChange={(e) => {
                  setCount(e.target.value);
                }}
                type="text"
                placeholder="Enter Doctors Count"
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicPassword">
              <Form.Label>Department Head</Form.Label>
              <Form.Control
                value={head}
                onChange={(e) => {
                  setHead(e.target.value);
                }}
                type="text"
                placeholder="Enter Department Head"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Department
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default DepartmentList;
