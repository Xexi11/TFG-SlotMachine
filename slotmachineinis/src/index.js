import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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

ReactDOM.render(
  <Auth0Provider
    domain="dev-9xa9t0s6.us.auth0.com"
    clientId="kvzotql0tZJWhvp5AjcVrefaKDPGGwBp"
    redirectUri={window.location.origin}
  >
    <App />,
  </Auth0Provider>,
  document.getElementById("root")
);
