import React from "react";
import "../styles/totalCard.css";

function TotalCard(props) {
  const dt = props.date;
  const newDT = dt.toLocaleString("en-US", { timeZone: "UTC" });
  return (
    <div className="main_card">
      <p>{newDT}</p>
      <p>${props.totals}</p>
    </div>
  );
}

export default TotalCard;
