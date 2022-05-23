import React from "react";
import "../../App.css";
import "../Css/Profile.css";
import { auth, provider } from "../../firebase-config";
import { getAuth } from "firebase/auth";

export default function Profile() {
  let TotalWallet = 1000;

  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div className="profile">
      <div className="profile_contanier">
        <div className="profile_contanier_imatge">
          <img src={user.photoURL} className="profile_contanier_imatge_src" />
        </div>
        <div className="profile_contanier_name">
          <h1>{user.displayName}</h1>
          <h1 className="user_contanier_locale">{user.locale}</h1>
        </div>
        <h2 className="user_contanier_email">{user.email}</h2>
        <h3>{"Wallet: " + TotalWallet}</h3>
      </div>
    </div>
  );
}
