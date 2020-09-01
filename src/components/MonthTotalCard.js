import React from "react";
import axios from "axios";
import "../styles/totalCard.css";

function MonthTotalCard(props) {
  const deleteTotal = () => {
    axios
      .delete(
        `https://cosmoincometrackerbe.herokuapp.com/api/month/${props.id}`
      )
      .then((res) => {})

      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        props.setRefresh(!props.refresh);
      });
  };

  return (
    <div className="month_main_card">
      <div className="card_parent">
        <p className="date">{props.date}</p>
        <button
          onClick={() => {
            deleteTotal();
          }}
          className="x_delete"
        >
          X
        </button>
      </div>
      <p>{props.totals}</p>
    </div>
  );
}

export default MonthTotalCard;
