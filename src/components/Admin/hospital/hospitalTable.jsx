import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  adminHospital,
  approveHospital,
  deleteHospital,
} from "../../../utils/Constants";
import Swal from "sweetalert2";

function HospitalList() {
  const [hospital, setHospital] = useState([]);
  useEffect(() => {
    getHospitallist();
  }, []);

  const getHospitallist = () => {
    axios.get(adminHospital).then((response) => {
      setHospital(response.data);
    });
  };

  const hospital_approval = (id) => {
    axios
      .put(`${approveHospital}/${id}`)
      .then((response) => {
        getHospitallist();
        Swal.fire("Is_approved Updated");
      })
      .catch((e) => {
        console.log("error");
      });
  };

  const deleteHosp = (id) => {
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
          .delete(`${deleteHospital}/${id}`)
          .then((res) => {
            getHospitallist();

            Swal.fire("Deleted!", "Hospital has been deleted.", "success");
          })
          .catch((err) => {
            Swal.fire("Not Deleted!");
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-10">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Hospital Name</th>
                <th>Admin Name</th>
                <th>Username</th>
                <th>Contact Number</th>
                <th>Is Approved</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {hospital.map((hos, index) => (
                <tr>
                  <td>{index + 1}</td>

                  <td>{hos.name}</td>
                  <td>{hos.admin_name}</td>
                  <td>{hos.username}</td>
                  <td>{hos.phone}</td>
                  <td>{hos.is_approved?"True":"False"}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {hos.is_approved?"Disapprove":"Approve"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => hospital_approval(hos.id)}
                        >
                          Approve
                        </Dropdown.Item>
                        <Dropdown.Item>Disapprove</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>

                  <td>
                    <Link>
                      <div
                        onClick={() => deleteHosp(hos.id)}
                        className="hospital_delete"
                      >
                        <FaTrash />
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default HospitalList;
