import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useState, useCallback, useEffect } from "react";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { db } from "../firebase-config";
import "./Css/Slots.css";

export default function Slots() {
  let spinSymbolsGif =
      "https://dl.dropbox.com/s/fj4l3k4ggiz5kk7/spinSymbolsGif.gif?dl=0",
    spinSymbolsAudio =
      "https://dl.dropbox.com/s/aohzg7ir69y8bph/spinSymbolsAudio.wav?dl=0",
    winSingleSymbolAudio =
      "https://dl.dropbox.com/s/gyez2dsuui1g9wh/winSingleSymbolAudio.wav?dl=0",
    winLineSymbolsAudio =
      "https://dl.dropbox.com/s/6nnkplmzm7bov94/winLineSymbolsAudio.wav?dl=0",
    betUpBetDownAudio =
      "https://dl.dropbox.com/s/zdji0tcpapkms0q/betUpBetDownAudio.wav?dl=0",
    addCreditsAudio =
      "https://dl.dropbox.com/s/6h7r0g2rl6rq7px/addCreditsAudio.wav?dl=0",
    objectSymbolOne,
    objectSymbolTwo,
    objectSymbolThree,
    winningSymbols = [
      {
        name: "bananas",
        img: "https://dl.dropbox.com/s/jd4acs3kp0xdojk/bananas.jpg?dl=0",
        points: 50,
      },
      {
        name: "bars",
        img: "https://dl.dropbox.com/s/mlvu6guv4wy11zt/bars.jpg?dl=0",
        points: 50,
        pointsTwo: 1,
      },
      {
        name: "bigWin",
        img: "https://dl.dropbox.com/s/jdnai74dgg4zwxg/bigWin.jpg?dl=0",
        points: 75,
        pointsTwo: 2,
      },
      {
        name: "cherries",
        img: "https://dl.dropbox.com/s/kcleb7p03qqbzet/cherries.jpg?dl=0",
        points: 10,
      },
      {
        name: "lemon",
        img: "https://dl.dropbox.com/s/n7951irnuz8j305/lemon.jpg?dl=0",
        points: 20,
      },
      {
        name: "orange",
        img: "https://dl.dropbox.com/s/ywxu3eegdb5zwdx/orange.jpg?dl=0",
        points: 40,
      },
      {
        name: "plum",
        img: "https://dl.dropbox.com/s/lk02cnz89tcc9j8/plum.jpg?dl=0",
        points: 30,
      },
      {
        name: "seven",
        img: "https://dl.dropbox.com/s/1t5ujomux17helf/seven.jpg?dl=0",
        points: 100,
        pointsTwo: 3,
      },
      {
        name: "watermelon",
        img: "https://dl.dropbox.com/s/lwsd1mt9abtlosf/watermelon.jpg?dl=0",
        points: 60,
      },
    ];

  const [{ user, authorized }, dispatch] = useStateValue();
  const [readyStart, setReadyStart] = useState(true);
  const [credits, setCredits] = useState(user.data.tokens);
  const [scrollWords, setscrollWords] = useState(
    " ### Welcome To Zodiac Slot Machine have fun and enjoy"
  );
  const [bet, setBet] = useState("05");
  const [winPoints, setWinPoints] = useState(0);
  const [symbols, setSymbols] = useState({
    firstSymbol: winningSymbols[7].img,
    secondSymbol: winningSymbols[7].img,
    thirdSymbol: winningSymbols[7].img,
  });
  const [winAudio, setWinAudio] = useState("https://empty.wav");
  const [startButtonId, setStartButtonId] = useState("start");
  const [addCreditsButtonId, setAddCreditsButtonId] = useState("add-credits");

  let loserPointsInformation = [
    //Frases cuando pierdes
    "You're awesome at losing",
    "Stop gambling",
    "Hey, you lost!",
    "Ouch! I felt that",
    "Don't beat yourself up",
    "There goes the college fund",
    "I have a cat. You have a loss",
    "Coding is hard",
    "Don't hate the coder",
    "You're a loser",
  ];
  let waitingPointsInformation = " ⏱Waiting...⏱      ⏱Waiting...⏱";
  let winningPointsInformation = " 🤑 Pure skill! 🤑  🤑 Pure skill! 🤑 ";

  const autobet50 = useCallback(() => {
    if (readyStart) {
      // prevent to click before pull the combination (if Start button is clicked)
      let betUpAudioId = document.getElementById("bet-up-audio");
      setBet(50);
      betUpAudioId.play();
    }
  }, [readyStart]);
  const autobet100 = useCallback(() => {
    if (readyStart) {
      // prevent to click before pull the combination (if Start button is clicked)
      let betUpAudioId = document.getElementById("bet-up-audio");
      setBet(100);
      betUpAudioId.play();
    }
  }, [readyStart]);

  const autobet200 = useCallback(() => {
    if (readyStart) {
      // prevent to click before pull the combination (if Start button is clicked)
      let betUpAudioId = document.getElementById("bet-up-audio");
      setBet(200);
      betUpAudioId.play();
    }
  }, [readyStart]);

  const incrementBet = useCallback(() => {
    if (readyStart) {
      // prevent to click before pull the combination (if Start button is clicked)
      let betUpAudioId = document.getElementById("bet-up-audio");
      if (bet < 200) {
        bet < 9 ? setBet(`0${Number(bet) + 5}`) : setBet(Number(bet) + 5);
        betUpAudioId.play();
      }
    }
  }, [bet, readyStart]);

  const withdrawAllTokens = useCallback(async () => {
    if (readyStart) {
      // prevent to click before pull the combination (if Start button is clicked)
      let betUpAudioId = document.getElementById("bet-up-audio");
      let tokens_user = credits + winPoints;
      console.log(tokens_user);
      if (tokens_user > 0) {
        const userdata = await setDoc(doc(db, "usuarios", user.uid), {
          ...user.data,
          tokens: tokens_user,
        });
        console.log(userdata);

        dispatch({
          type: actionTypes.SET_COINS_USER,
          tokens: tokens_user,
        });

        let white_text = " ";
        var retiradaText = "" + tokens_user + white_text + "Witdrawn";
        setscrollWords(retiradaText);
        betUpAudioId.play();
      }
    }
  }, [bet, readyStart]);

  const decrementBet = useCallback(() => {
    if (readyStart) {
      let betDownAudioId = document.getElementById("bet-down-audio");
      if (bet > 5) {
        bet < 11 ? setBet(`0${Number(bet) - 5}`) : setBet(Number(bet) - 5);
        betDownAudioId.play();
      }
    }
  }, [bet, readyStart]);

  const pullPossibility = (pulledNumber) => {
    switch (true) {
      case pulledNumber < 6:
        return "seven";
      case pulledNumber > 5 && pulledNumber < 16:
        return "bars";
      case pulledNumber > 15 && pulledNumber < 31:
        return "bigWin";
      case pulledNumber > 30 && pulledNumber < 51:
        return "watermelon";
      case pulledNumber > 50 && pulledNumber < 76:
        return "bananas";
      case pulledNumber > 75 && pulledNumber < 106:
        return "orange";
      case pulledNumber > 105 && pulledNumber < 141:
        return "plum";
      case pulledNumber > 140 && pulledNumber < 181:
        return "lemon";
      case pulledNumber > 180:
        return "cherries";
      default:
        return "seven";
    }
  };

  const getLoser = () => {
    let random =
      loserPointsInformation[
        Math.floor(Math.random() * loserPointsInformation.length)
      ];
    return random;
  };

  const pullCombination = () => {
    if (readyStart && credits + winPoints - bet >= 0) {
      setReadyStart(false); // this prevent to click Start button more than once until pull the combination
      setStartButtonId("start2");
      setSymbols({
        firstSymbol: spinSymbolsGif,
        secondSymbol: spinSymbolsGif,
        thirdSymbol: spinSymbolsGif,
      });
      // the total possible credits amount is 50000
      if (credits + winPoints - bet >= 50000) {
        setCredits(50000);
      } else {
        setCredits(credits + winPoints - bet);
      }
      setWinPoints("0"); // display zero as string as won points until pull the combination to prevent to blink ADD CREDITS button if it was zero as number
      let spinSymbolsAudioId = document.getElementById("spin-symbols-audio");
      spinSymbolsAudioId.play();
      setTimeout(() => {
        let pulledSymbolOne = pullPossibility(
            Math.floor(Math.random() * (225 - 1 + 1)) + 1 - 1
          ),
          pulledSymbolTwo = pullPossibility(
            Math.floor(Math.random() * (225 - 1 + 1)) + 1 - 1
          ),
          pulledSymbolThree = pullPossibility(
            Math.floor(Math.random() * (225 - 1 + 1)) + 1 - 1
          );
        objectSymbolOne = winningSymbols.find(
          (el) => el.name === pulledSymbolOne
        );
        objectSymbolTwo = winningSymbols.find(
          (el) => el.name === pulledSymbolTwo
        );
        objectSymbolThree = winningSymbols.find(
          (el) => el.name === pulledSymbolThree
        );
        setSymbols({
          firstSymbol: objectSymbolOne.img,
          secondSymbol: objectSymbolTwo.img,
          thirdSymbol: objectSymbolThree.img,
        });
        let currentWinningPoints = (objectOne, objectTwo, objectThree) => {
          let currentPoints = 0,
            winAudioId = document.getElementById("win-audio");
          if (
            objectOne.name === objectTwo.name &&
            objectTwo.name === objectThree.name
          ) {
            currentPoints += objectOne.points;
            setWinAudio(winLineSymbolsAudio);
            winAudioId.play();
          } else if ((objectOne.name === objectTwo.name) === objectThree.name) {
            currentPoints += objectOne.points + 30;
            setWinAudio(winLineSymbolsAudio);
            winAudioId.play();
          } else {
            if (
              objectOne.name === "bars" ||
              objectOne.name === "bigWin" ||
              objectOne.name === "seven"
            ) {
              currentPoints += objectOne.pointsTwo;
              setWinAudio(winSingleSymbolAudio);
              winAudioId.play();
            }
            if (
              objectTwo.name === "bars" ||
              objectTwo.name === "bigWin" ||
              objectTwo.name === "seven"
            ) {
              currentPoints += objectTwo.pointsTwo;
              setWinAudio(winSingleSymbolAudio);
              winAudioId.play();
            }
            if (
              objectThree.name === "bars" ||
              objectThree.name === "bigWin" ||
              objectThree.name === "seven"
            ) {
              currentPoints += objectThree.pointsTwo;
              setWinAudio(winSingleSymbolAudio);
              winAudioId.play();
            }
          }
          if (currentPoints > 0) {
            setscrollWords(winningPointsInformation);
          } else {
            setscrollWords(getLoser());
          }

          setWinPoints(currentPoints * bet);
        };
        currentWinningPoints(
          objectSymbolOne,
          objectSymbolTwo,
          objectSymbolThree
        );
        setStartButtonId("start");
        setReadyStart(true);
      }, 1000);

      setscrollWords(waitingPointsInformation);
    }
  };

  useEffect(() => {
    if (credits + winPoints === 0) {
      setStartButtonId("start2");
      setAddCreditsButtonId("add-credits2");
    }
  }, [credits, winPoints]);

  return (
    <div id="slot-container">
      <div id="slot-machine">
        <header>Slot Machine</header>
        <div className="indicators">
          <div id="credits">
            <div>TOKENS</div>
            <div>{credits}</div>
          </div>
          <div id="bet">
            <div>BET</div>
            <div>{bet}</div>
          </div>
          <div id="won">
            <div>WON</div>
            <div>{winPoints}</div>
            <audio id="win-audio" src={winAudio} />
          </div>
        </div>
        <div id="scroll">
          <div>{scrollWords}&nbsp;</div>
        </div>
        <div className="combinations">
          <div id="bank1">
            <img src={symbols.firstSymbol} alt="pulled symbol" width="100" />
          </div>
          <div id="bank2">
            <img src={symbols.secondSymbol} alt="pulled symbol" width="100" />
          </div>
          <div id="bank3">
            <img src={symbols.thirdSymbol} alt="pulled symbol" width="100" />
          </div>
        </div>
        <div className="withdraw_container">
          <button
            type="button"
            id="withdraw-tokens"
            onClick={() => withdrawAllTokens()}
          >
            Withdraw all Tokens
            <audio id="bet-up-audio" src={addCreditsAudio} />
          </button>
          <button
            type="button"
            id={startButtonId}
            onClick={() => pullCombination()}
          >
            START
            <audio id="spin-symbols-audio" src={spinSymbolsAudio} />
          </button>
        </div>
        <div className="buttons">
          <div id="up-buttons">
            <button type="button" id="bet-apuesta" onClick={() => autobet50()}>
              50
              <audio id="bet-up-audio" src={betUpBetDownAudio} />
            </button>
            <button type="button" id="bet-apuesta" onClick={() => autobet100()}>
              100
              <audio id="bet-up-audio" src={betUpBetDownAudio} />
            </button>
            <button type="button" id="bet-apuesta" onClick={() => autobet200()}>
              200
              <audio id="bet-up-audio" src={betUpBetDownAudio} />
            </button>

            <button type="button" id="bet-up" onClick={() => incrementBet()}>
              BET UP
              <audio id="bet-up-audio" src={betUpBetDownAudio} />
            </button>

            <button type="button" id="bet-down" onClick={() => decrementBet()}>
              BET DOWN
              <audio id="bet-down-audio" src={betUpBetDownAudio} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
