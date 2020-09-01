import React, { useState } from "react";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import CreateTotal from "./components/CreateTotal";
import ViewTotal from "./components/ViewTotal";
import MonthTotals from "./components/MonthTotals";
import { Route } from "react-router-dom";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1 className="main_title">Sarah's Income Tracker</h1>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ProtectedRoute
        exact
        path="/"
        component={(props) => (
          <ViewTotal {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      />
      <ProtectedRoute path="/MonthTotals" component={MonthTotals} />
      <Route path="/Register" component={Register} />
      <Route path="/Login" component={Login} />
      <ProtectedRoute path="/CreateTotal" component={CreateTotal} />
    </div>
  );
}

export default App;
