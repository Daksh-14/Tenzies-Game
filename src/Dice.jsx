import './Dice.css'

export default function Dice(props) {
  return (
    <div onClick={props.handleClick} className={`Dice-container ${props.isHeld ? "green" : "white"}`}>{props.value} </div>
  )
}