import React from "react";
import "./opTicket.css";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "../../../utils/axios";
import { opticket } from "../../../utils/Constants";
import { useEffect } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function OpTicket() {
  const id = Cookies.get("id");
  const [ticket, setTicket] = useState([]);

  const optickets = () => {
    console.log("inside optickets");
    axios.get(`${opticket}/${id}`).then((response) => {
      setTicket(response.data);
    });
  };

  useEffect(() => {
    optickets();
  }, []);

  const handleCaptureClick = async () => {
    try {
      const canvas = await html2canvas(
        document.getElementsByClassName("card")[0]
      );
      const dataURL = canvas.toDataURL("image/png");
      downloadjs(dataURL, "download.png", "image/png");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  return (
    <div className="col">
      <div className="row">
        {ticket.map((t) => (
          <div className="card w-25 m-5 ">
            <h3 className="card-header">easyDoc</h3>
            <div className="card-body">
              <h5 className="card-title mb-3">OP Ticket</h5>
              <p className="card-text">
                Patient Name : <span>{t.name} </span>
              </p>
              <p className="card-text">
                Age : <span>{t.age} </span>
              </p>
              <p className="card-text">
                Token :<span> {t.token}</span>
              </p>
              <p className="card-text">
                Date : <span>{t.date} </span>
              </p>
              <p className="card-text">
                Doctor : <span>{t.doctor} </span>
              </p>
              <button className="btn btn-dark" onClick={handleCaptureClick}>
                Download OP Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OpTicket;
