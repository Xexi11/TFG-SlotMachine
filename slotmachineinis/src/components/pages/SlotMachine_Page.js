import React from "react";
import { useStateValue } from "../../context/StateProvider";
import SlotMachine from "../SlotMachine";

export default function SlotMachine_Page() {
  const [{ user, authorized }, dispatch] = useStateValue();
  console.log(this.user.data);

  return (
    <div style={{ width: "90%", height: "100%" }}>
      <SlotMachine />
    </div>
  );
}
