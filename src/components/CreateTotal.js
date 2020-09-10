import React, { useState } from "react";
import axios from "axios";
import "../styles/createTotal.css";

function CreateTotal(props) {
  const user_ID = localStorage.getItem("userID");
  var d = new Date().toLocaleString("en-US", { timeZone: "UTC" });
  const [form, setForm] = useState({
    user_id: user_ID,
    total_for_day: 0,
    date: d,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("https://cosmoincometrackerbe.herokuapp.com/api/totals", form)
      .then((res) => {
        console.log(res);
        props.history.push("/");
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const onFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="create_total_form" onSubmit={onSubmitHandler}>
      <div className="create_total_parent">
        <label className="create_total_label">CREATE A TOTAL</label>
        <input
          className="create_total_input"
          name="total_for_day"
          placeholder="0.00"
          value={form.name}
          onChange={onFormChange}
        />
      </div>
      <button id="primaryButton" className="create_total_button" type="submit">
        Create
      </button>
    </form>
  );
}

export default CreateTotal;
