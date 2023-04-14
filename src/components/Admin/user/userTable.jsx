import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";
// import Dropdown from "react-bootstrap/Dropdown";

import { adminUser, blockUser } from "../../../utils/Constants";
import Swal from "sweetalert2";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";

function UserList() {
  const [user, setUser] = useState([]);
  const [records, setRecords] = useState([]);

  function handleFilter(e) {
    const newData = records.filter((row) => {
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    axios.get(adminUser).then((response) => {
      setUser(response.data);
      const data = response.data.map((user, index) => ({
        slno: index + 1,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        blocked: user.is_active ? "True" : "False",
      }));
      setRecords(data);
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

  const columns = [
    {
      name: "SL.No",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Is_Blocked",
      selector: (row) => row.blocked,
    },
    {
      name: "Block/Unblock",
      cell: (row) =>
        row.blocked === "True" ? (
          <Switch
            onClick={() => user_block(row.id)}
            defaultChecked
            color="default"
          />
        ) : (
          <Switch onClick={() => user_block(row.id)} color="default" />
        ),
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-10">
          <div className="text-end">
            <input
              type="text"
              placeholder="Search User"
              onChange={handleFilter}
            />
          </div>
          <DataTable columns={columns} data={records} pagination />
          {/* <Table striped bordered hover>
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
          </Table> */}
        </div>
      </div>
    </div>
  );
}

export default UserList;
