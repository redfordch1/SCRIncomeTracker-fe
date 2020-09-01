import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";
import "../styles/login.css";

function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onLoginSubmit = () => {
    axiosWithAuth()
      .post("/api/users/login", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userID", res.data.user_id);
        props.history.push("/");
      })

      .catch((err) => {
        alert(`${err} Invalid username or password`);
      });
  };

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form className="login_form" onSubmit={handleSubmit(onLoginSubmit)}>
      <h1 className="login_h1">Sign in</h1>
      <div>
        <div className="login_username_password">
          <label className="login_label">USERNAME</label>
          <input
            className="login_input"
            name="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
            ref={register({ required: true, minLength: 4, maxLength: 20 })}
          />
          {errors.username && (
            <p className="error">It must be a valid username</p>
          )}
        </div>
        <div className="login_username_password">
          <label className="login_label">PASSWORD</label>
          <input
            className="login_input"
            name="password"
            type="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            ref={register({ required: true, minLength: 4, maxLength: 20 })}
          />

          {errors.password && (
            <p className="error">It must be a valid password</p>
          )}
        </div>
      </div>
      <button className="login_button" type="submit">
        Log in
      </button>
      <p className="login_form_Link">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
    </form>
  );
}

export default Login;
