import React from "react";
import "./Css/Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out these EPIC Games!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/ruleta.jpg"
              text="Come and play our incredible roulette"
              label="Roulette"
              path="/games"
            />
            <CardItem
              src="images/slotmachine.jpg"
              text="Bet on our slots games"
              label="Slots"
              path="/slotmachine"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="images/poker.jpg"
              text="More that 100 tables to play"
              label="Poker"
              path="/games"
            />
            <CardItem
              src="images/blackjack.jpg"
              text="Bet our house"
              label="Blackjack"
              path="/games"
            />
            <CardItem
              src="images/bingo.jpg"
              text="Win coutless prizes"
              label="Adrenaline"
              path="/games"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
