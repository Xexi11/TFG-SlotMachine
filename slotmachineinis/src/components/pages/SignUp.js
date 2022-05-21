import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "../Button";
import "../Css/SingUp.css";
import "../../App.css";
export default function SignUp() {
  var firebase = require("firebase");
  var firebaseui = require("firebaseui");
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start("#firebaseui-auth-container", {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        requireDisplayName: false,
      },
    ],
  });

  const { loginWithRedirect } = useAuth0();
  return (
    <div className="singup">
      <div className="signup-box">
        <h1>Inicia sesión para acceder a Inis Casino </h1>
        <Button
          id="bttn_login"
          onClick={() => loginWithRedirect()}
          buttonStyle="btn--outline"
          buttonSize="medium"
        >
          {" "}
          SING IN{" "}
        </Button>
      </div>
    </div>
  );
}
