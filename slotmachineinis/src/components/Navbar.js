import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import "./Css/Navbar.css";

import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

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
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      window.location.pathname = "/";
    });
  };

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <>
      <nav className="navbar">
        {!isAuth ? (
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
                  onClick={(() => signUserOut, closeMobileMenu)}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
            {button && (
              <Button onClick={() => signUserOut} buttonStyle="btn--outline">
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
