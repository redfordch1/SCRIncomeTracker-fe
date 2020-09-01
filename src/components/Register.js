import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "../styles/register.css";

function Register(props) {
  const { handleSubmit, register, errors } = useForm();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onRegisterSubmit = (form) => {
    axios
      .post(
        "https://cosmoincometrackerbe.herokuapp.com/api/users/register",
        form
      )
      .then((res) => {
        props.history.push("/Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="register_form" onSubmit={handleSubmit(onRegisterSubmit)}>
      <h1 className="register_h1">Sign Up</h1>
      <div>
        <div className="register_username_password">
          <label className="register_label">USERNAME</label>
          <input
            className="register_input"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            ref={register({ required: true, minLength: 4, maxLength: 20 })}
          />
          {errors.username && "Username to short!"}
        </div>
        <div className="register_username_password">
          <label className="register_label">PASSWORD</label>
          <input
            className="register_input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            ref={register({
              required: true,
              minLength: 4,
              maxLength: 20,
            })}
          />
          {errors.password && "Password to short!"}
        </div>
      </div>

      <button className="register_button" type="submit">
        Submit
      </button>
      <p className="register_form_Link">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default Register;
