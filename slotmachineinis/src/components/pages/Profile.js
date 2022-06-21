import React, { useEffect, useState } from "react";
import "../../App.css";
import "../Css/Profile.css";
import { Icon } from "@iconify/react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { auth, db, provider } from "../../firebase-config";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, onValue, child, get } from "firebase/database";
import { useStateValue } from "../../context/StateProvider";
import { doc, setDoc } from "firebase/firestore";
import { Button } from "../Button";
import { ethers } from "ethers";
import { TextField } from "@mui/material";

export default function Profile() {
  let TotalTokens = 900;

  const usuarioGoogle = auth.currentUser;
  const displayName = usuarioGoogle.displayName;
  const email = usuarioGoogle.email;
  const photoURL = usuarioGoogle.photoURL;

  const [{ user, authorized }, dispatch] = useStateValue();
  console.log(user);
  const [credits, setCredits] = useState(user.data.tokens);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  /*   const auth = getAuth();
  const user = auth.currentUser; */

  /* INTENTAR que se vaya actualizando el Credits */
  useEffect(() => {
    setCredits(user.data.tokens);
  }, []);
  

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


  function BuyTokensMetamask() {
    
  }
  function ExchangeTokensMetamask() {}

  /* 
  const tokensCountRef = ref(db, "tokens/" + user + "/wallet");
  onValue(tokensCountRef, (snapshot) => {
    const data = snapshot.val();
    updatetokensCountRef(postElement, data);
  });
 */
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen_exchange = () => {
    setOpen2(true);
  };
  const handleClose_exchange = () => {
    setOpen2(false);
  };


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
        <h3 className="user_contanier_tokens">{"Tokens: " + credits}</h3>
        {user.data.walletAddres == "" ? (
          <Button
            onClick={() => connectWalletMetamask()}
            buttonStyle="btn--outline"
          >
            Connect Wallet Metamask
          </Button>
        ) : (
          <div className="profile_contanier_imatge_metamask">
            <Icon icon="logos:metamask-icon" width="30" />
            <h3>{"Connected"}</h3>
            <div className="profile_contanier_buttons">
              <Button
                onClick={() =>  handleClickOpen() }
                buttonStyle="btn--primary"
              >
                Buy Tokens
              </Button>
              <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title_buytokens"
                  aria-describedby="alert-dialog-description_buytokens"
                >
                  <DialogTitle id="alert-dialog-title_buytokens">
                    {"How many tokens you buy?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description_buytokens">
                      Enter the number of tokens you want.
                    </DialogContentText>
                    <TextField
                        id="outlined-password-input"
                        label="Tokens"
                        type="number"
                      />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={handleClose} autoFocus>
                      Buy
                    </Button>
                  </DialogActions>
                </Dialog>

              <Button
                onClick={() =>handleClickOpen_exchange() } 
                buttonStyle="btn--primary"
              >
                Exchange Tokens
              </Button>
              <Dialog
                  open={open2}
                  onClose={handleClose_exchange}
                  aria-labelledby="alert-dialog-title_buytokens"
                  aria-describedby="alert-dialog-description_buytokens"
                >
                  <DialogTitle id="alert-dialog-title_buytokens">
                    {"Withdraw all the tokens?"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description_buytokens">
                      Are you sure to Withdraw all the Zodiac Tokens. Once done you will have all the coins in Phantom Tokens.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose_exchange}>Close</Button>
                    <Button onClick={handleClose_exchange} autoFocus>
                      Withdraw
                    </Button>
                  </DialogActions>
                </Dialog>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
