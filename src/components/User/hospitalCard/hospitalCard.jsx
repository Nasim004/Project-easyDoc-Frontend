import React from "react";
import {
  CCard,
  CRow,
  CCol,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
} from "@coreui/react";
import axios from "../../../utils/axios";
import { randomhospitals } from "../../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";
import { GoLocation } from "react-icons/go";

export default function HospitalCard() {
  const [hospital, setHospital] = useState([]);

  const ourHospital = (e) => {
    axios.get(randomhospitals).then((response) => {
      setHospital(response.data);
    });
  };

  useEffect(() => {
    ourHospital();
  },[]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center m-5">OUR HOSPITALS</h1>
          </div>
        </div>
      </div>

      <div className="row">
          {hospital.map((hos) => {
            return(
        <div className="col-md-6">  
            <CCard className="m-3" style={{ maxWidth: "600px" }}>
              <CRow className="g-0">
                <CCol md={4}>
                  <CCardImage src="../../../Images/hospital2.jpg" />
                </CCol>
                <CCol md={8}>
                  <CCardBody>
                    <CCardTitle className="h2 text-primary">{hos.name}</CCardTitle>
                    <CCardText className="h5 text-success" >
                    <GoLocation /> {hos.muncipality},{hos.district}
                    </CCardText>
                    <CCardText className="h5 text-dark">{hos.description}</CCardText>
                    {/* <CCardText>
                      <small className="text-medium-emphasis">
                        Doctor and Department Counts
                      </small>
                    </CCardText> */}
                  </CCardBody>
                </CCol>
              </CRow>
            </CCard>
        </div>
        )
          })}
      </div>
    </div>
  );
}
