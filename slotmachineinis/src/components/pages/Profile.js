import React, { useEffect } from "react";
import "../../App.css";
import "../Css/Profile.css";

import { auth, db, provider } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onValue, child, get } from "firebase/database";
import { useStateValue } from "../../context/StateProvider";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "../Button";
import { ethers } from "ethers";

export default function Profile() {
  let Wallet = "_wallet";

  let TotalTokens = 900;

  const [{ user, authorized }, dispatch] = useStateValue();
  console.log(user);
  /*   const auth = getAuth();
  const user = auth.currentUser; */

  async function connectWalletMetamask() {
    const prov = new ethers.providers.Web3Provider(window.ethereum);

    await prov.send("eth_requestAccounts", []);

    const signer = prov.getSigner();

    const _wallet = await signer.getAddress();
    const userdata = await setDoc(doc(db, "usuarios", user.uid), {
      ...user.data,
      walletAddres: _wallet,
    });
  }

  /* 
  const tokensCountRef = ref(db, "tokens/" + user + "/wallet");
  onValue(tokensCountRef, (snapshot) => {
    const data = snapshot.val();
    updatetokensCountRef(postElement, data);
  });
 */
  return (
    <div className="profile">
      <div className="profile_contanier">
        <div className="profile_contanier_imatge">
          <img src={user.photoURL} className="profile_contanier_imatge_src" />
        </div>

        <div className="profile_contanier_name">
          <h2>{user.data.firebaseId}</h2>
          <h1 className="user_contanier_locale">{user.locale}</h1>
        </div>
        <h2 className="user_contanier_email">{user.email}</h2>
        <h3>{"Wallet: " + user.data.walletAddres}</h3>
        <h3>{"Tokens: " + user.data.tokens}</h3>
        {user.data.walletAddres == "" ? (
          <Button
            onClick={() => connectWalletMetamask()}
            buttonStyle="btn--outline"
          >
            Connect Wallet Metamask
          </Button>
        ) : (
          <h3>{"WalletConnected"}</h3>
        )}
      </div>
    </div>
  );
}
