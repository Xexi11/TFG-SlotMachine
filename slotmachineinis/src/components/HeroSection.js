import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./Css/HeroSection.css";
import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function HeroSection() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [{}, dispatch] = useStateValue();

  const inisweb = () => {
    window.location = "https://zodiacblockchainsolutions.com/";
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      let userFound = false;

      localStorage.setItem("isAuth", true);
      console.log(result);

      const q = query(
        collection(db, "usuarios"),
        where("firebaseId", "==", result.user.uid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(() => {
        userFound = true;
      });

      if (userFound) {
        querySnapshot.forEach((doc) => {
          userFound = true;
          dispatch({
            type: actionTypes.SET_USER,
            user: { uid: doc.id, data: doc.data() },
          });
          window.localStorage.setItem("firebaseId", result.user.uid);
          console.log(`${doc.id} => ${doc.data()}`);
        });
      } else {
        try {
          const docRef = await addDoc(collection(db, "usuarios"), {
            firebaseId: result.user.uid,
            tokens: 0,
            walletAddres: "",
            location: "ESP",
            //Se pueden añadir mas campos -- `prxim
          });
          dispatch({
            type: actionTypes.SET_USER,
            user: { uid: docRef.id, data: docRef.data() },
          });
          window.localStorage.setItem("firebaseId", result.user.uid);

          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
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
