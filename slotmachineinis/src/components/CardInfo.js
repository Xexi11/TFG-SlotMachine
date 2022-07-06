import React from "react";
import "./Css/CardInfo.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function CardInfo(props) {
  return (
    <div className="CardInfo_container">
      <div className="CardInfo_imatge">
        {" "}
        <img className="Info_img" alt="Info Image" src={props.src} />
      </div>
      <div className="CardInfo_title">
        {" "}
        <h1>{props.title}</h1>
      </div>
      <div className="CardInfo_text">
        {" "}
        <h3>{props.text}</h3>
      </div>
      <Button size="small">Learn More</Button>
    </div>
  );
}

export default CardInfo;
