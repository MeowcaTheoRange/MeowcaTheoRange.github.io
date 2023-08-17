import { useEffect, useState } from "react";
import BarGraph from "./BarGraph";
import "./QuaverScores.css";

function QuaverScores({ id }: { id: string }) {
  const [scores, setScores] = useState([] as any[]);
  const [open, setOpen] = useState(false);
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
      {scores.slice(0, open ? -1 : 5).map((score, i) => (
        <div className="QuaverScore" key={i}>
          <div className="title">
            <a
              href={"https://quavergame.com/mapset/map/" + score.map?.id}
              target="_blank"
              rel="noreferrer"
            >
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
                <span>
                  PR {Math.round(score.performance_rating * 100) / 100}
                </span>
                <span> • </span>
                <span>ACC {Math.round(score.accuracy * 100) / 100}%</span>
              </span>
            </div>
          </div>
          <h1>Summary</h1>
          <div className="creationName">
            <span>COMBO {score.max_combo}</span>
            <span> • </span>
            <span>BAD {score.count_miss + score.count_okay}</span>
          </div>
          <BarGraph
            data={[
              ["MARV", "Marvelous!", score.count_marv],
              ["PERF", "Perfect", score.count_perf],
              ["GREAT", "Great", score.count_great],
              ["GOOD", "Good", score.count_good],
              ["OKAY", "Okay", score.count_okay],
              ["MISS", "Misses", score.count_miss],
            ]}
          />
        </div>
      ))}
      <button onClick={() => setOpen(!open)}>
        {open ? "See Less" : "See All"}
      </button>
    </div>
  );
}

export default QuaverScores;
