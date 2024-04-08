import { useState,useEffect } from 'react'
import './App.css'
import Dice from './Dice.jsx';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [diceElements,setDiceElements]=useState(generateNum());
  const [Tenzies,setTenzies]=useState(false)
  useEffect(() => {
    const allHeld = diceElements.every(die => die.isHeld)
    const firstValue = diceElements[0].value
    const allSameValue = diceElements.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
  }, [diceElements])

  function holdDice(id) {
    setDiceElements(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
  }
  function generateNum(){
    let arr=[]
    for(let i=0;i<10;i++){
      arr.push({value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid()});
    }
    return arr;
  }
  function reroll() {
    if(!Tenzies){
    setDiceElements(oldDice => oldDice.map(die => {
        return die.isHeld ? 
            die :
            {value:Math.ceil(Math.random()*6),
              isHeld:false,
              id:nanoid()}
    }))
  }
  else{
    setTenzies(false)
    setDiceElements(generateNum());
  }
}
  return (
    <div className='App-outer'>
      {Tenzies && <Confetti/>}
      <div className='App-inner'>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="Game-outer">
            <div className="Game-dice-container">
                {diceElements.map((ele)=>{
                  return <Dice value={ele.value} key={ele.id} isHeld={ele.isHeld} handleClick={()=>holdDice(ele.id)}/>
                })}
            </div>
            <button className='Game-button' onClick={reroll}>
              {Tenzies?"New Game":"Roll"}
            </button>
          </div>
      </div>
    </div>
  )
}

export default App
