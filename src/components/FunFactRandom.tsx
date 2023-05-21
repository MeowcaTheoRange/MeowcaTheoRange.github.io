import { useEffect, useState } from "react";
import "./FunFactRandom.css";
import DescriptionArea from "./DescriptionArea";

function FunFactRandom({ funFacts }: { funFacts: string[] }) {
  const [funFact, setFunFact] = useState(funFacts[0]);
  const [prevFactIndex, setPrevFactIndex] = useState(0); // This is a state because JS (V8) is fucking stupid
  function newFunFact(index?: number) {
    let factIndex;
    if (index)
      factIndex =
        prevFactIndex + index < 0
          ? funFacts.length - 1
          : prevFactIndex + index >= funFacts.length
          ? 0
          : prevFactIndex + index;
    else
      do factIndex = Math.round(Math.random() * (funFacts.length - 1));
      while (factIndex === prevFactIndex);
    setPrevFactIndex(factIndex);
    var currentFunFact = funFacts[factIndex];
    var availableCharacters = currentFunFact.replace(/ /g, "");

    var prevTime: number = performance.now();
    function typeAnim(timeNow: number) {
      let dt = (timeNow - prevTime) / 500;
      let typeIndex = Math.floor(dt * currentFunFact.length);
      setFunFact(
        currentFunFact
          .substring(0, typeIndex)
          .split("")
          .map((x) =>
            x === " "
              ? " "
              : availableCharacters.charAt(
                  Math.floor(Math.random() * availableCharacters.length)
                )
          )
          .join("")
      );
      if (dt > 1) {
        prevTime = performance.now();
        window.requestAnimationFrame(garble);
        return;
      }
      window.requestAnimationFrame(typeAnim);
    }
    function garble(timeNow: number) {
      let dt = (timeNow - prevTime) / 500;
      let garbleIndex = Math.floor(dt * currentFunFact.length);
      setFunFact(
        currentFunFact.substring(0, garbleIndex) +
          currentFunFact
            .substring(garbleIndex)
            .split("")
            .map((x) =>
              x === " "
                ? " "
                : availableCharacters.charAt(
                    Math.floor(Math.random() * availableCharacters.length)
                  )
            )
            .join("")
      );
      if (dt > 1) return;
      window.requestAnimationFrame(garble);
    }
    window.requestAnimationFrame(typeAnim);
  }

  useEffect(newFunFact, []);

  return (
    <div className="FunFactRandom">
      <div className="Header">
        <h1>Fun Fact About Me</h1>
        <span></span>
        <div className="ButtonHolder">
          <button onClick={() => newFunFact(-1)}>&lt;</button>
          <button onClick={() => newFunFact()}>Random</button>
          <button onClick={() => newFunFact(1)}>&gt;</button>
        </div>
      </div>
      <DescriptionArea>{funFact}</DescriptionArea>
    </div>
  );
}

export default FunFactRandom;
