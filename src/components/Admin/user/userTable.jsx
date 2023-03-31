import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { adminUser, blockUser } from "../../../utils/Constants";
import Swal from "sweetalert2";
import Switch from "@material-ui/core/Switch";


function UserList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios.get(adminUser).then((response) => {
      setUser(response.data);
    });
  };

  const user_block = (id) => {
    axios
      .put(`${blockUser}/${id}`)
      .then((response) => {
        getUserList();
        Swal.fire("Updated");
      })
      .catch((e) => {
        console.log("error");
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Is Active</th>
                <th>Block</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user, index) => (
                <tr>
                  <td>{user.index}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.is_active ? "True" : "False"}</td>
                  <td>
                    {user.is_active ? (
                      <Switch
                        onClick={() => user_block(user.id)}
                        defaultChecked
                        color="default"
                      />
                    ) : (
                      <Switch
                        onClick={() => user_block(user.id)}
                        defaultUnChecked
                        color="default"
                      />
                    )}
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

export default UserList;
