import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TotalCard from "./TotalCard";
import "../styles/viewTotal.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function ViewTotal(props) {
  const user_ID = localStorage.getItem("userID");
  const [user, setUser] = useState([]);
  const [totals, setTotals] = useState([]);
  var addedTotal;
  var numbsArray = [];
  var d = new Date().toLocaleString("en-US", { timeZone: "America/Denver" });

  useEffect(() => {
    axios
      .get(`https://cosmoincometrackerbe.herokuapp.com/api/users/${user_ID}`)
      .then((res) => {
        setUser(res.data);
        props.setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_ID]);

  useEffect(() => {
    axios
      .get(`https://cosmoincometrackerbe.herokuapp.com/api/totals/${user_ID}`)
      .then((res) => {
        setTotals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_ID]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  totals.map((numbs) => {
    var sum = 0;
    numbsArray.push(numbs.total_for_day);
    numbsArray.forEach(add);

    function add(item) {
      sum += item;
      addedTotal = sum;
    }
  });

  const updateAllTotals = () => {
    axios
      .get(`https://cosmoincometrackerbe.herokuapp.com/api/totals/${user_ID}`)
      .then((res) => {
        setTotals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAllTotals = () => {
    axios
      .delete(
        `https://cosmoincometrackerbe.herokuapp.com/api/totals/${user_ID}`
      )
      .then((res) => {
        console.log(res);
        updateAllTotals();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  var formattedTotal = formatter.format(addedTotal);

  const form = {
    user_id: user_ID,
    total_for_month: formattedTotal,
  };
  console.log("This is the form --> ", form);

  const addMonthlyTotal = () => {
    axios
      .post("https://cosmoincometrackerbe.herokuapp.com/api/month", form)
      .then((res) => {
        props.history.push("/MonthTotals");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>You want to delete all totals?</p>
            <button className="modal_button1" onClick={onClose}>
              No
            </button>
            <button
              className="modal_button2"
              onClick={() => {
                deleteAllTotals();
                onClose();
              }}
            >
              Yes, Delete!
            </button>
          </div>
        );
      },
    });
  };

  if (!numbsArray.length) {
    return (
      <div>
        <div className="parent_title_link">
          <h2 className="user_title">Totals for {user.username}</h2>
          <Link className="create_total_link" to="/CreateTotal">
            Create Total
          </Link>
          <div>
            {totals.map((allTotals) => {
              console.log("This --> ", allTotals);
              return (
                <TotalCard
                  key={allTotals.id}
                  totals={allTotals.total_for_day}
                  date={allTotals.date}
                />
              );
            })}
          </div>
        </div>
        <p className="final_total">Need Totals to add!!!</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="parent_title_link">
          <h2 className="user_title">Totals for {user.username}</h2>
          <Link className="create_total_link" to="/CreateTotal">
            Create Total
          </Link>
        </div>
        <div className="all_cards">
          {totals.map((allTotals) => {
            return (
              <TotalCard
                key={allTotals.id}
                totals={allTotals.total_for_day}
                date={allTotals.date}
              />
            );
          })}
        </div>
        <p className="final_total">Final Total: {formattedTotal}</p>
        <div className="button_parent">
          <button
            onClick={() => {
              addMonthlyTotal();
            }}
            className="final_total_button"
            type="submit"
          >
            Save Final Total For Month
          </button>
          <button
            onClick={() => {
              submit();
            }}
            className="delete_button"
            type="submit"
          >
            Delete All Totals
          </button>
        </div>
      </div>
    );
  }
}
