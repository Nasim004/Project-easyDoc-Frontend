import React, { useEffect } from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import { GoLocation } from "react-icons/go";
import axios from "../../../utils/axios";
import { userhospital } from "../../../utils/Constants";
import { useState } from "react";
import {
  CCard,
  CRow,
  CCol,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
} from "@coreui/react";

export default function HospitalList() {
  const [hospital, setHospital] = useState([]);

  const getHospitals = () => {
    axios.get(userhospital).then((response) => {
      setHospital(response.data);
    });
  };

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <MDBCarousel showControls dealy={3000}>
            <MDBCarouselItem
              className="w-100 d-block"
              itemId={1}
              src="../../../Images/hospitalBanner.png"
              alt="..."
            />
          </MDBCarousel>
          <div className="row mt-3 ms-3">
            {hospital.map((hos) => {
              return (
                <div className="col-md-6">
                  <CCard className="m-3" style={{ maxWidth: "600px" }}>
                    <CRow className="g-0">
                      <CCol md={4}>
                        <CCardImage src="../../../Images/hospital2.jpg" />
                      </CCol>
                      <CCol md={8}>
                        <CCardBody>
                          <CCardTitle className="h2 text-primary">
                            {hos.name}
                          </CCardTitle>
                          <CCardText className="h5 text-success">
                            <GoLocation /> {hos.muncipality},{hos.district}
                          </CCardText>
                          <CCardText className="h6 text-dark">
                            {hos.description}
                          </CCardText>
                          <CCardText>
                            <button
                              type="button"
                              className="btn btn-md btn-secondary active btn-block"
                            >
                              Book an Appoitment
                            </button>
                          </CCardText>
                        </CCardBody>
                      </CCol>
                    </CRow>
                  </CCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
