import React from "react"
import Die from "./Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import TenzieData from "./TenzieData.js"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [bestTime, setBestTime] = React.useState(localStorage.getItem('setTime') || 0)
    const [bestRolls, setBestRolls] = React.useState(localStorage.getItem('setRolls') || 0)
    const startTimerOnHeld = dice.some(die => die.isHeld)
    
    function handleRolls(){
        setRolls(prevRolls => prevRolls + 1)
    }
    
    React.useEffect(() => {
        let timer
        if (!tenzies && startTimerOnHeld){
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1)
                }, 1000);
        }
        return () => clearInterval(timer)
    }, [tenzies, startTimerOnHeld])
    
    
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            if(time < localStorage.getItem('setTime') || !localStorage.getItem('setTime')){
                localStorage.setItem('setTime', JSON.stringify(time))  
                setBestTime(time)
            }
            if(rolls < localStorage.getItem('setRolls') || !localStorage.getItem('setRolls')){
                localStorage.setItem('setRolls', JSON.stringify(rolls))
                setBestRolls(rolls)
            }
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(-1)
            setTime(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice =>
          oldDice.map(die => {
            return die.id === id ?
              Object.assign({}, die, { isHeld: !die.isHeld }) :
              die;
          })
        );
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    function handleClick(){
        rollDice()
        handleRolls()
    }
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <TenzieData 
                rolls={rolls}
                time={time}
                bestTime={bestTime}
                bestRolls={bestRolls}
            />
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={handleClick}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}