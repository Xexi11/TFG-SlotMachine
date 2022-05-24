import React, { useEffect } from "react";
import "../../App.css";
import "../Css/Profile.css";
import { Icon } from "@iconify/react";

import { auth, db, provider } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onValue, child, get } from "firebase/database";
import { useStateValue } from "../../context/StateProvider";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "../Button";
import { ethers } from "ethers";

export default function Profile() {
  let TotalTokens = 900;

  const usuarioGoogle = auth.currentUser;
  const displayName = usuarioGoogle.displayName;
  const email = usuarioGoogle.email;
  const photoURL = usuarioGoogle.photoURL;

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
      tokens: TotalTokens,
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
          <img src={photoURL} className="profile_contanier_imatge_src" />
        </div>
        <div className="div_name_nationality">
          <h2>{displayName} </h2>
          <h2 className="user_contanier_locale">{user.data.location}</h2>
        </div>
        <h2 className="user_contanier_email">{email}</h2>
        <h4 className="user_contanier_wallet">
          {"Wallet: " + user.data.walletAddres}
        </h4>
        <h3 className="user_contanier_tokens">
          {"Tokens: " + user.data.tokens}
        </h3>
        {user.data.walletAddres == "" ? (
          <Button
            onClick={() => connectWalletMetamask()}
            buttonStyle="btn--outline"
          >
            Connect Wallet Metamask
          </Button>
        ) : (
          <div className="profile_contanier_imatge_metamask">
            <Icon icon="logos:metamask-icon" width="40" />
            <h3>{"MetaMask Connected"}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
