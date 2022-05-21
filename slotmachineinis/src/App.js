import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import Games from "./components/pages/Games";
import { useAuth0, User } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useEffect } from "react";

import SlotMachine_Page from "./components/pages/SlotMachine_Page";
import SlotMachine from "./components/SlotMachine";

function App() {
  const history = useHistory();
  const { isAuthenticated } = useAuth0();

  const firebaseConfig = {
    apiKey: "AIzaSyDVbrZLKrei2XCCaTqA5JE_PmPUETbEbF4",
    authDomain: "slotmachine-c537c.firebaseapp.com",
    projectId: "slotmachine-c537c",
    storageBucket: "slotmachine-c537c.appspot.com",
    messagingSenderId: "484508762054",
    appId: "1:484508762054:web:5e9bc1fe013721d8687cc7",
    measurementId: "G-X07R5E819H",
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          {isAuthenticated ? (
            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/profile" component={Profile} />
              <Route path="/games" component={Games} />
              <Route path="/singup" component={SignUp} />
              <Route path="/slotmachine" component={SlotMachine} />
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
