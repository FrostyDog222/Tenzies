import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
    border: "2px solid black",
    borderRadius: "10px",
    width: "60px",
    height: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "40px",
    lineHeight: "0",
    margin: 0,
  };

  let dots = [];
  switch (props.value) {
    case 1:
      dots = ["   ", " • ", "   "];
      break;
    case 2:
      dots = ["•  ", "   ", "  •"];
      break;
    case 3:
      dots = ["•  ", " • ", "  •"];
      break;
    case 4:
      dots = ["• •", "   ", "• •"];
      break;
    case 5:
      dots = ["• •", " • ", "• •"];
      break;
    case 6:
      dots = ["• •", "• •", "• •"];
      break;
    default:
      dots = [];
  }

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {dots.map((dotRow, index) => (
        <div key={index}>{dotRow}</div>
      ))}
    </div>
  );
}