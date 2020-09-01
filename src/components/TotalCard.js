import React from "react";
import "../styles/totalCard.css";

function TotalCard(props) {
  return (
    <div className="main_card">
      <p>{props.date}</p>
      <p>${props.totals}</p>
    </div>
  );
}

export default TotalCard;
