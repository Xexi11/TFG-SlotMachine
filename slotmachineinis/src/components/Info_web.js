import React from "react";
import "./Css/bannerInfo.css";
import CardItem from "./CardItem";
import CardInfo from "./CardInfo";

function Info_web() {
  return (
    <div className="bannerinfo">
      <div className="info-header">
        <p className="info-header">Discover and play on our magnific games</p>
      </div>
      <div class="info-body">
        <CardInfo
          title="COME AND PLAY"
          text="Register and join in a big community"
        />
        <CardItem
          src="images/poker.jpg"
          text="Register and join in a big community"
          label="RE"
          path="/games"
        />
        <CardItem
          src="images/poker.jpg"
          label="RE"
          text="Play and enjoy of our games"
        />
        <CardItem
          src="images/poker.jpg"
          text="More that 100 tables to play"
          label="Poker"
          path="/games"
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
