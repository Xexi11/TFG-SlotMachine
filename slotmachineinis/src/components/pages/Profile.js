import React, { useEffect, useState } from "react";
import "../../App.css";
import "../Css/Profile.css";
import { Icon } from "@iconify/react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { auth, db, provider } from "../../firebase-config";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, set, ref, onValue, child, get } from "firebase/database";
import { useStateValue } from "../../context/StateProvider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../Button";
import { ethers } from "ethers";
import { TextField } from "@mui/material";
import { useCasino } from "../../contracts/useCasino";

export default function Profile() {
  let TotalTokens = 0;

  const usuarioGoogle = auth.currentUser;
  const displayName = usuarioGoogle.displayName;
  const email = usuarioGoogle.email;
  const photoURL = usuarioGoogle.photoURL;
  const [tokens, setTokens] = useState(0);
  const [{ user, authorized }, dispatch] = useStateValue();
  // console.log(user);
  const [credits, setCredits] = useState(user.data.tokens);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const { takeTokens, withdrawTokens } = useCasino();

  useEffect(() => {
    //cridar al firebase
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

    window.location.reload();
  }

  //FUNCION DE COMPRAR TOKENS  y luego meterlos en la BDD
  async function BuyTokensMetamask() {
    await takeTokens(tokens);

    let buyCredits = parseFloat(tokens) + parseFloat(credits);
    const userdata = await setDoc(doc(db, "usuarios", user.uid), {
      ...user.data,
      tokens: buyCredits,
    });
    handleClose();
    window.location.reload();
    //Firebase actualizar els tokens
  }

  // CUANDO RETIREMOS TODOS LOS TOKENS PRIMERO SE MIRA EN BDD y luego los sacamos todos
  async function ExchangeTokensMetamask() {
    await withdrawTokens(tokens);
    let tokens_restantes = parseFloat(credits) - parseFloat(tokens);
    const userdata = await setDoc(doc(db, "usuarios", user.uid), {
      ...user.data,
      tokens: tokens_restantes,
    });
    handleClose_exchange();
    window.location.reload();
  }

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

  const shortWallet = (wallet, slicer) => {
    if (slicer) {
      return `${wallet.slice(0, slicer)}...${wallet.slice(
        wallet.length - slicer,
        wallet.length
      )}`;
    } else {
      return `${wallet.slice(0, 8)}...${wallet.slice(
        wallet.length - 8,
        wallet.length
      )}`;
    }
  };

  return (
    <div className="profile">
      <div className="profile_contanier">
        <div className="profile_contanier_imatge">
          <img src={photoURL} className="profile_contanier_imatge_src" />
        </div>
        <div className="div_name_nationality">
          <h2>{usuarioGoogle.displayName} </h2>
          <h2 className="user_contanier_locale">{user.data.location}</h2>
        </div>
        <h2 className="user_contanier_email">{email}</h2>
        <h4 className="user_contanier_wallet">
          {"Wallet: " + shortWallet(user.data.walletAddres)}
        </h4>
        <h3 className="user_contanier_tokens">
          {"Tokens: " + credits} <Icon icon="clarity:coin-bag-solid" />
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
            <Icon icon="logos:metamask-icon" width="30" />
            <h3>{"Connected"}</h3>
            <div className="profile_contanier_buttons">
              <Button
                onClick={() => handleClickOpen()}
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
                <DialogContent id="dialog-contenidor">
                  <DialogContentText id="alert-dialog-description_buytokens">
                    Enter the number of tokens you want.
                  </DialogContentText>
                  <div className="Dialog_textField_container">
                    <TextField
                      id="outlined-password-input"
                      value={tokens}
                      label="Tokens"
                      onChange={(e) => setTokens(e.target.value)}
                      type="number"
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={BuyTokensMetamask}>Buy</Button>
                </DialogActions>
              </Dialog>

              <Button
                onClick={() => handleClickOpen_exchange()}
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
                  {"Exchange your tokens?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description_buytokens">
                    How many Zodiac Tokens you want to exchange?. <br /> Once
                    done you will have all the coins in Phantom Tokens.
                  </DialogContentText>
                  <div className="Dialog_textField_container">
                    <TextField
                      id="outlined-password-input"
                      value={tokens}
                      label="Tokens"
                      onChange={(e) => setTokens(e.target.value)}
                      type="number"
                    />
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose_exchange}>Close</Button>
                  <Button onClick={ExchangeTokensMetamask} autoFocus>
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
