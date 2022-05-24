import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reducer, { initialState } from "./context/reducer";
import StateProvider from "./context/StateProvider";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>,

  document.getElementById("root")
);
