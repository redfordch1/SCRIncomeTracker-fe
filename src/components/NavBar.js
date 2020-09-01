import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function NavBar(props) {
  const logOut = (e) => {
    e.preventDefault();
    console.log("LOGGING OUT");
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    props.setIsLoggedIn(false);
    window.location.reload();
  };

  if (!props.isLoggedIn) {
    return (
      <div className="nav_parent">
        <Link className="nav_links" to="/Register">
          Register
        </Link>
        <Link className="nav_links" to="/Login">
          Login
        </Link>
      </div>
    );
  } else {
    return (
      <div className="nav_parent">
        <Link className="nav_links" to="/">
          Day Totals
        </Link>
        <Link className="nav_links" to="/MonthTotals">
          Month Totals
        </Link>
        <Link className="nav_links" onClick={logOut} to="/">
          Log Out
        </Link>
      </div>
    );
  }
}

export default NavBar;
