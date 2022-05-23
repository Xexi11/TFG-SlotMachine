import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useNavigate,
} from "react-router-dom";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import Games from "./components/pages/Games";

import { auth } from "./firebase-config";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useEffect } from "react";

import SlotMachine_Page from "./components/pages/SlotMachine_Page";
import SlotMachine from "./components/SlotMachine";

function App() {
  const history = useHistory();

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <>
      <Router>
        <Navbar setIsAuth={setIsAuth} />
        <Switch>
          {isAuth ? (
            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/profile" component={Profile} />
              <Route path="/games" component={Games} />
              <Route path="/singup" component={SignUp} />
              <Route
                path="/slotmachine"
                component={SlotMachine}
                setIsAuth={setIsAuth}
              />
            </Switch>
          ) : (
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" component={SignUp} />
              <Route path="/games" component={SignUp} />
            </Switch>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
