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

import { auth, db } from "./firebase-config";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { useEffect } from "react";

import SlotMachine_Page from "./components/pages/SlotMachine_Page";
import SlotMachine from "./components/SlotMachine";
import { useStateValue } from "./context/StateProvider";
import { collection, getDocs, query, where } from "firebase/firestore";
import { actionTypes } from "./context/reducer";
import { getAuth } from "firebase/auth";

function App() {
  const history = useHistory();

  const [{ user, authorized }, dispatch] = useStateValue();
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  useEffect(() => {
    async function fechdata() {
      const localStorage_Id = window.localStorage.getItem("firebaseId");
      if (localStorage_Id) {
        const q = query(
          collection(db, "usuarios"),
          where("firebaseId", "==", localStorage_Id)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: { uid: doc.id, data: doc.data() },
          });
        });
      }
    }
    fechdata();
  }, []);

  return (
    <>
      <Router>
        <Navbar setIsAuth={setIsAuth} />
        <Switch>
          {authorized ? (
            <Switch>
              <Route path="/" exact component={Home} />

              <Route path="/profile" component={Profile} />
              <Route path="/games" component={Games} />
              <Route path="/singup" component={SignUp} setIsAuth={setIsAuth} />
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
