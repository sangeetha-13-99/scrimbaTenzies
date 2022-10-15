import React from "react";
export default function Die(props) {
  return (
    <div
      className={
        "die" + " die" + props.value + (props.isOnHold ? " die-hold" : "")
      }
      onClick={(event) => props.handler(event, props.id)}
    >
      {/* {props.value} */}
      {[...Array(props.value)].map(() => (
        <span className="die-dot"></span>
      ))}
    </div>
  );
}
