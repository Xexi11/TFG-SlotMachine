import React     from 'react';
import { Button } from './Button';
import './Css/SlotMachine.css';


function RepeatButton(props){
  return(
    <div className="button_cointainer">
      <Button onClick={props.onClick} type="button" id='repeatButton' autocomplete="off" aria-pressed="false" buttonStyle='btn--outline' >Play Again</Button>
    </div>
  );
}


function WinningSound(){
  return (
    <audio autoPlay="autoplay" className="player" preload="false">
      <source src="https://andyhoffman.codes/random-assets/img/slots/winning_slot.wav" />
    </audio>  
    );

}


function CalculateSlotValue(position, slotIcon){
  if(position === 0){
    return slotIcon = "Hamburguesa" 
  }
  else if (position === -188){
    return slotIcon = "Pizza" 
  }
  else if (position === -376){
    return slotIcon = "Brocoli" 
  }
  else if (position === -564){
    return slotIcon = "Piña" 
  }
  else if (position === -752){
    return slotIcon = "Platano" 
  }
  else if (position === -940){
    return slotIcon = "Beer" 
  }
  else if (position === -1128){
    return slotIcon = "Aguacate" 
  }
  else if (position === -1316){
    return slotIcon = "Maiz" 
  }
  else if (position === -1504){
    return slotIcon = "Cereza" 
  }
}
 

  
export default class SlotMachine extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      winner: null,
      prize: 0,
      totalWalllet: 1000,
      apuesta: 0,
      
    }
    this.finishHandler = this.finishHandler.bind(this)
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() { 
    this.setState({ winner: null, prize: 0});
    this.emptyArray();
    this._child1.forceUpdateHandler();
    this._child2.forceUpdateHandler();
    this._child3.forceUpdateHandler();
  }

  static loser = [ //Frases cuando pierdes
    'Not quite', 
    'Stop gambling', 
    'Hey, you lost!', 
    'Ouch! I felt that',      
    'Don\'t beat yourself up',
    'There goes the college fund',
    'I have a cat. You have a loss',
    'You\'re awesome at losing',
    'Coding is hard',
    'Don\'t hate the coder'
  ];

  static matches = [];
  
  //Momento De Finalizar de Roll
  finishHandler(value) {
    SlotMachine.matches.push(value);  

    if (SlotMachine.matches.length === 3) {
      const { winner, prize } = this.state;
      const first = CalculateSlotValue(SlotMachine.matches[0], "")
      const second = CalculateSlotValue(SlotMachine.matches[1], "")
      const third = CalculateSlotValue(SlotMachine.matches[2], "")
      
      let results = this.calculateEquals(first,second,third);
      
      
      console.log(results)
      this.calculateMoneyWallet();
      this.setState({ winner: results});
    }
  }
    

  //Funciones Para Calcular si las columnas son iguales y cual es el premio correspondiente
  calculatePrizeThree(icon){
    const {winner, prize } = this.state;
    if(icon === "Hamburguesa" ){
      return this.setState({ prize: 200 });
    }
    else if (icon === "Pizza" ){
      return this.setState({ prize: 400 });
    }
    else if (icon === "Brocoli" ){
      return this.setState({ prize: 600 });
    }
    else if (icon === "Piña"){
      return this.setState({ prize: 800 });
    }
    else if (icon === "Platano" ){
      return this.setState({ prize: 1000 });
    }
    else if (icon === "Beer"){
      return this.setState({ prize: 1200 });
    }
    else if (icon === "Aguacate" ){
      return this.setState({ prize: 1600 });
    }
    else if (icon === "Maiz"){
      return this.setState({ prize: 2000 });
    }
    else if (icon === "Cereza"){
      return this.setState({ prize: 3000 });
    }
  } 
  calculatePrizeTwo(col1,col2,col3) {
      if((col1 === "Hamburguesa" && col1===col2 )|| (col2 === "Hamburguesa" && col2===col3 )|| (col1 === "Hamburguesa" && col1===col3)){
        return this.setState({ prize: 100 });
      }
      else if((col1 === "Pizza" && col1===col2 )|| (col2 === "Pizza" && col2===col3 )|| (col1 === "Pizza" && col1===col3)){
        return this.setState({ prize: 200 });
      }
      else if((col1 === "Brocoli" && col1===col2 )|| (col2 === "Brocoli" && col2===col3 )|| (col1 === "Brocoli" && col1===col3)){
        return this.setState({ prize: 300 });
      }
      else if((col1 === "Piña" && col1===col2 )|| (col2 === "Piña" && col2===col3 )|| (col1 === "Piña" && col1===col3)){
        return this.setState({ prize: 450 });
      }
      else if((col1 === "Platano" && col1===col2 )|| (col2 === "Platano" && col2===col3 )|| (col1 === "Platano" && col1===col3)){
        return this.setState({ prize: 550 });
      }
      else if((col1 === "Beer" && col1===col2 )|| (col2 === "Beer" && col2===col3 )|| (col1 === "Beer" && col1===col3)){
        return this.setState({ prize: 650 });
      }
      else if((col1 === "Aguacate" && col1===col2 )|| (col2 === "Aguacate" && col2===col3 )|| (col1 === "Aguacate" && col1===col3)){
        return this.setState({ prize: 850 });
      }
      else if((col1 === "Maiz" && col1===col2 )|| (col2 === "Maiz" && col2===col3 )|| (col1 === "Maiz" && col1===col3)){
        return this.setState({ prize: 1100 });
      }
      else if((col1 === "Cereza" && col1===col2 )|| (col2 === "Cereza" && col2===col3 )|| (col1 === "Cereza" && col1===col3)){
        return this.setState({ prize: 1600 });
      }
    }
  calculateEquals(row1, row2, row3) {
      let first = row1;
      let second = row2;
      let third = row3;
      if(first === second === third){
        this.calculatePrizeThree(first)
        return true;
      }
      else if(first === second  || second === third  || third === first){
        this.calculatePrizeTwo(first,second,third, 0)
        return true;
      }
      else{
        return false;
      } 
   }
  calculateMoneyWallet(){
    const { winner, prize, totalWalllet, apuesta } = this.state;
    let premio = prize;
    let wallet = totalWalllet;
    if (premio !== 0){
      let ganador = wallet + premio;
      this.setState({ totalWalllet: ganador });
    }
    else{
      let perdedor = wallet - apuesta;
      this.setState({ totalWalllet: perdedor})
    }
  } 
   
  emptyArray() {
    SlotMachine.matches = [];
  }
  RepeatButton(props){
    return(
      <button 
      aria-label='Play again'
      id='repeatButton'
      onClick={props.onClick}/>
    );
  }
  render() {
    const { winner, prize, totalWalllet } = this.state;
    const getLoser = () => {       
      return SlotMachine.loser[Math.floor(Math.random()*SlotMachine.loser.length)]
    }
    
    let repeatButton = null;
    let winningSound = null;
    let prizeValue = 0;
     
    
    prizeValue = prize
    if (winner !== null) {
      repeatButton = <RepeatButton onClick={this.handleClick} />
    }
    
    if (winner) {
      winningSound = <WinningSound />
    }



    return(
      <div className={`spinner-marco`}>
        <div >
        {winningSound}
        <h1 className='textWinning' style={{ color: 'white'}}>
          <span>{winner === null ? 'Waiting…' : winner ? '🤑 Pure skill! 🤑' : getLoser()}</span>
        </h1>
          <h1 style={{ color: 'white'}}>
          <span>{winner === null ?  '' : winner ? 'Premio = ' + prizeValue :  '' }</span></h1>
          <div className={`spinner-box`}>
              {repeatButton}
              <Button variant="contained" size="medium">
                  100
              </Button>  
              <div className={`spinner-container`}>

                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child1 = child; }} timer="1000" />
                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child2 = child; }} timer="1400" />
                <Spinner onFinish={this.finishHandler} ref={(child) => { this._child3 = child; }} timer="2200" />
                <div className="gradient-fade"></div>
              </div>
          </div>  
        </div>
        <h1 className='textWallet'style={{ color: 'white'}}>
          <span>{"Total en la cartera: " + totalWalllet}</span></h1>
      </div>
    );
  }
}

class Spinner extends React.Component {  
  constructor(props){
    super(props);
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  };

  forceUpdateHandler(){
    this.reset();
  }; 

  reset() {
    if (this.timer) { 
      clearInterval(this.timer); 
    }  

    this.start = this.setStartPosition();

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer        
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);      
  }

  state = {
    position: 0,
    lastPosition: null
  }
  static iconHeight = 188;
  multiplier = Math.floor(Math.random()*(4-1)+1);

  start = this.setStartPosition();
  //randomiza el slot
  speed = Spinner.iconHeight * this.multiplier;    

  setStartPosition() {
    return ((Math.floor((Math.random()*9))) * Spinner.iconHeight)*-1;
  }

  moveBackground() {
    this.setState({ 
      position: this.state.position - this.speed,
      timeRemaining: this.state.timeRemaining - 100
    })
  }

  getSymbolFromPosition() {
    let { position } = this.state;
    const totalSymbols = 9;
    const maxPosition = (Spinner.iconHeight * (totalSymbols-1)*-1);
    let moved = (this.props.timer/100) * this.multiplier
    let startPosition = this.start;
    let currentPosition = startPosition;    

    for (let i = 0; i < moved; i++) {              
      currentPosition -= Spinner.iconHeight;

      if (currentPosition < maxPosition) {
        currentPosition = 0;
      }      
    }

    this.props.onFinish(currentPosition);
  }

  tick() {      
    if (this.state.timeRemaining <= 0) {
      clearInterval(this.timer);    
      this.getSymbolFromPosition();    

    } else {
      this.moveBackground();
    }      
  }

  componentDidMount() {
    clearInterval(this.timer);

    this.setState({
      position: this.start,
      timeRemaining: this.props.timer
    });

    this.timer = setInterval(() => {
      this.tick()
    }, 100);
  }

  render() {
    let { position, current } = this.state;   

    return (            
      <div 
        style={{backgroundPosition: '0px ' + position + 'px'}}
        className={`icons`}          
      />
    )
  }
}

