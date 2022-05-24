import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Css/Navbar.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { auth, db, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [{ user, authorized }, dispatch] = useStateValue();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

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
      querySnapshot.forEach((doc) => {
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

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        window.localStorage.removeItem("firebaseId");

        window.location.reload();
      })
      .catch((error) => {
        console.log("ERROR SING OUT");
      });
  };

  return (
    <>
      <nav className="navbar">
        {!authorized ? (
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              ZODIAC
              <img className="navbar-icon" src="/images/ZODIAC_LOGO.png" />
              {/*  La imagen no es cuadrada */}
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/games"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Games
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="nav-links-mobile"
                  onClick={(() => signInWithGoogle(), closeMobileMenu)}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
            {button && (
              <Button
                onClick={() => signInWithGoogle()}
                buttonStyle="btn--outline"
              >
                SIGN UP
              </Button>
            )}
          </div>
        ) : (
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              ZODIAC
              <img className="navbar-icon" src="/images/ZODIAC_LOGO.png" />
              {/*  La imagen no es cuadrada */}
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/games"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Games
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="nav-links-mobile"
                  onClick={(() => signUserOut(), closeMobileMenu)}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
            {button && (
              <Button onClick={() => signUserOut()} buttonStyle="btn--outline">
                SIGN OUT
              </Button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
