import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./Css/HeroSection.css";
import { useAuth0, User } from "@auth0/auth0-react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";

function HeroSection() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const inisweb = () => {
    window.location = "https://zodiacblockchainsolutions.com/";
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/";
    });
  };

  return (
    <div className="hero-container">
      <video src="/videos/animacion_fichas.mp4" autoPlay loop muted />
      <h1>PLAY AND WIN</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={() => signInWithGoogle()}
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
          onClick={() => inisweb()}
        >
          MORE INFO <i className="far fa-play-circle" />{" "}
          {/* Poner informacion de Geminis o de la el juego */}
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
