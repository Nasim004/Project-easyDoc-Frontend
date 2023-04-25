import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./confirmed.css";

function Confirmed() {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="container">
        <div className="bookingImage m-5  col-md-12 text-center">
          <img src="../../../Images/confirmed.png" />
        </div>

        <div className=" col-md-12 text-center">
          <h1>Your Appointment Is Confimed</h1>
        </div>
        <div className=" col-md-12 text-center">
          <Link to="/">Download OP Ticket</Link>
        </div>

        <div className=" col-md-12 text-center">
          <Button onClick={() => navigate(`/`)} className="mt-1">
            Back To Home
          </Button>
        </div>
      </div> */}

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mt-3">
            <img
              alt="Bootstrap Image Preview"
              src="../../../Images/confirmed.png"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Your Appointment Is Confimed</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to="/" className="text-center">
              Download OP Ticket
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Button onClick={() => navigate(`/`)} className="mt-1">
              Back To Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Confirmed;
