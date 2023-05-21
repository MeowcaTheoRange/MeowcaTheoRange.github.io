import { useEffect, useState } from "react";
import "./QuaverScores.css";

function QuaverScores({ id }: { id: string }) {
  const [scores, setScores] = useState([] as any[]);
  async function getScores() {
    setScores(
      (
        await (
          await fetch(
            "https://api.quavergame.com/v1/users/scores/recent?mode=1&id=" + id
          )
        ).json()
      ).scores
    );
  }
  useEffect(() => {
    getScores();
  }, []);
  return (
    <div className="QuaverScores">
      {scores.slice(0, 5).map((score, i) => (
        <div className="QuaverScore" key={i}>
          <div className="title">
            <a href="https://quavergame.com/mapset/map/" target="_blank">
              <span>{score.map?.artist}</span>
              <span> • </span>
              <span>{score.map?.title}</span>
            </a>
          </div>
          <div className="creationName">
            <span>{score.map?.creator_username}</span>
            <span> • </span>
            <span>{score.map?.difficulty_name}</span>
          </div>
          <div className="horizcont">
            <div className="grade">{score.grade}</div>
            <div className="stats">
              <span>Played {new Date(score.time).toLocaleString()}</span>
              <span>
                <span>
                  {score.mods_string === "None" ? "No mods" : score.mods_string}
                </span>
                <span> • </span>
                <span>{score.total_score}</span>
                <span> • </span>
                <span>{Math.round(score.accuracy * 100) / 100}%</span>
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuaverScores;
