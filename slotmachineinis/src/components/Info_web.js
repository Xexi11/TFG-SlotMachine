import React from "react";
import "./Css/bannerInfo.css";
import { Icon } from "@iconify/react";
import CardInfo from "./CardInfo";

function Info_web() {
  return (
    <div className="bannerinfo">
      <div className="info-header">
        <p className="info-header">
          {" "}
          <h1>Discover and play on our magnific games</h1>
        </p>
      </div>
      <div class="info-body">
        <CardInfo
          title="Join To the Family"
          text="Register and join in a big community and explore our new games. "
          src="images/join_family.png"
        />
        <CardInfo
          title="Play and win incredible reward"
          text="Incredible rewards and prizes, 200 news prizes will be won every month."
          src="images/fichaCasino.png"
        />
        <CardInfo
          title="Responsable Gaming"
          text="Learn all about responsable gaming and advices."
          src="images/responsibility.png"
        />
      </div>
    </div>
  );
}

export default Info_web;

/* import React from "react";
import CardItem from "./CardItem";
import "./Css/bannerInfo.css";
function BannerInfo() {
  
}
 */
