import axios from "../../../utils/axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  adminHospital,
  approveHospital,
  deleteHospital,
} from "../../../utils/Constants";
import Swal from "sweetalert2";
import Switch from "@material-ui/core/Switch";
import DataTable from "react-data-table-component";

function HospitalList() {
  const [hospital, setHospital] = useState([]);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    getHospitallist();
  }, []);

  const getHospitallist = () => {
    axios.get(adminHospital).then((response) => {
      setHospital(response.data);
      const data = response.data.map((hospital, index) => ({
        slno: index + 1,
        id: hospital.id,
        name: hospital.name,
        adminname: hospital.admin_name,
        username: hospital.username,
        phone: hospital.phone,
        approve: hospital.is_approved ? "True" : "False",
      }));
      setRecords(data);
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

  const columns = [
    {
      name: "SL.NO",
      selector: (row) => row.slno,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Admin Name",
      selector: (row) => row.adminname,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Approved Status",
      selector: (row) => row.approve,
    },
    {
      name: "Aprpove/Disapprove",
      cell: (row) =>
        row.approve === "True" ? (
          <Switch
            onClick={() => hospital_approval(row.id)}
            defaultChecked
            color="default"
          />
        ) : (
          <Switch onClick={() => hospital_approval(row.id)} color="default" />
        ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <Link>
          <div onClick={() => deleteHosp(row.id)} className="hospital_delete">
            <FaTrash />
          </div>
        </Link>
      ),
    },
  ];
  function handleFilter(e){
    const newData = records.filter((row)=>{
      return row.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-10">
        <div className="text-end">
            <input
              type="text"
              placeholder="Search Hospital"
              onChange={handleFilter}
            />
          </div>
          <DataTable columns={columns} data={records} pagination></DataTable>
        </div>
      </div>
    </div>
  );
}
export default HospitalList;
