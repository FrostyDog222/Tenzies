import React from "react"

export default function TenzieData(props){
    return (
        <div>
            <div className="tenzie--data">
                <p>Rolls : {props.rolls}</p>
                <p>Time : {props.time}</p>
            </div>
            <div className="tenzie--record">
                <p>Best Rolls: {props.bestRolls}</p>
                <p>Best Time : {props.bestTime}</p>
            </div>
        </div>
    )
}