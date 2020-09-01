import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MonthTotalCard from "./MonthTotalCard";
import "../styles/viewTotal.css";

export default function MonthTotals(props) {
  const user_ID = localStorage.getItem("userID");
  const [user, setUser] = useState([]);
  const [monthTotals, setMonthTotals] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios
      .get(`https://cosmoincometrackerbe.herokuapp.com/api/users/${user_ID}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user_ID]);

  useEffect(() => {
    axios
      .get(`https://cosmoincometrackerbe.herokuapp.com/api/month/${user_ID}`)
      .then((res) => {
        setMonthTotals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  if (!monthTotals.length) {
    return (
      <div>
        <div className="month_parent_title_link">
          <h2 className="user_title">Totals for {user.username}</h2>
          <div>
            {monthTotals.map((allTotals) => {
              console.log("This --> ", allTotals);
              return (
                <MonthTotalCard
                  key={allTotals.id}
                  user_ID={user_ID}
                  refresh={refresh}
                  setRefresh={setRefresh}
                  totals={allTotals.total_for_month}
                  date={allTotals.date}
                />
              );
            })}
          </div>
        </div>
        <p className="final_total">Need Totals!!!</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="month_parent_title_link">
          <h2 className="user_title">Monthly Totals for {user.username}</h2>
        </div>
        <div className="month_all_cards">
          {monthTotals.map((allTotals) => {
            return (
              <MonthTotalCard
                key={allTotals.id}
                user_ID={user_ID}
                id={allTotals.id}
                refresh={refresh}
                setRefresh={setRefresh}
                totals={allTotals.total_for_month}
                date={allTotals.date}
              />
            );
          })}
          <p className="bottom_line"></p>
        </div>
      </div>
    );
  }
}
