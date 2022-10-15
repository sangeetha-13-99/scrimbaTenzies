import "./styles.css";
import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";
export default function App() {
  const [dies, setDies] = React.useState(newDies);
  const [tenzies, setTenzies] = React.useState(false);
  const [noOfRolls, setNoOfRolls] = React.useState(0);
  const [local, updateLocal] = React.useState(
    () => localStorage.getItem("bestOfTenzies") || 50
  );
  // console.log(localStorage.getItem('bestOfTenzies'))
  React.useEffect(() => {
    let dieValue,
      istenzies = 0;
    dies.map((die, ind, array) => {
      if (!dieValue && die.onhold) {
        dieValue = die.value;
        istenzies += 1;
      } else if (die.onhold && die.value === dieValue) {
        istenzies += 1;
      }
    });
    setTenzies(istenzies === 10);
  }, [dies]);

  React.useEffect(() => {
    if (tenzies) {
      noOfRolls < Number(local) &&
        localStorage.setItem("bestOfTenzies", noOfRolls) &&
        updateLocal(noOfRolls);
    }
  }, [tenzies]);

  function newDies() {
    const newDiesArray = [];
    for (let i = 0; i < 10; i++) {
      newDiesArray.push({
        id: i,
        value: Math.floor(Math.random() * 6) + 1,
        onhold: false
      });
    }
    return newDiesArray;
  }

  function updateDieHold(evnt, target) {
    console.log(target);
    setDies((oldDies) => {
      return oldDies.map((oldDie) =>
        oldDie.id === target ? { ...oldDie, onhold: !oldDie.onhold } : oldDie
      );
    });
  }

  function rollDice() {
    setNoOfRolls((prev) => prev + 1);
    setDies((oldDies) => {
      return oldDies.map((oldDie) =>
        oldDie.onhold === true
          ? oldDie
          : { ...oldDie, value: Math.floor(Math.random() * 6) + 1 }
      );
    });
  }
  function resetDies() {
    setDies(newDies);
  }

  return (
    <div className="game-border-outer">
      <div className="game-border-inner">
        <h2 className="game-heading">Tenzies</h2>
        <p className="game-subHeading">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dies-outer">
          {dies.map((die) => {
            return (
              <Die
                key={die.id}
                id={die.id}
                value={die.value}
                isOnHold={die.onhold}
                handler={updateDieHold}
              />
            );
          })}
        </div>
        {tenzies && (
          <div className="bottom-elm">
            <button onClick={resetDies}>Reset Game</button>
            <div className="no-of-rolls">
              <span>no of die rolls took :</span>
              <span>{noOfRolls}</span>
              <span>best of tenzies :</span>
              <span>{local}</span>
            </div>
            {/* <div className=" no-of-rolls best-tenzies">
            </div> */}
          </div>
        )}
        {!tenzies && <button onClick={rollDice}>Roll Dice</button>}
        {tenzies && <Confetti gravity={0.4} />}
      </div>
    </div>
  );
}
