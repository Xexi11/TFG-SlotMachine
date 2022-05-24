import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "../Button";
import "../Css/SingUp.css";
import "../../App.css";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";

export default function SignUp({}) {
  const [{ user, authorized }, dispatch] = useStateValue();

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
    <div className="singup">
      <div className="signup-box">
        <h1>Inicia sesión para acceder a Inis Casino </h1>
        <Button
          id="bttn_login"
          onClick={() => signInWithGoogle()}
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
