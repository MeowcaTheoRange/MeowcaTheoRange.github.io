import { useEffect, useState } from "react";
import "./LastFmScores.css";

function LastFmScores({ user, api_key }: { user: string; api_key: string }) {
  const [scores, setScores] = useState([] as any[]);
  async function getScores() {
    setScores(
      (
        await (
          await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${api_key}&format=json&extended=1`
          )
        ).json()
      ).recenttracks.track
    );
  }
  useEffect(() => {
    getScores();
  }, []);
  return (
    <div className="LastFmScores">
      {scores.slice(0, 5).map((score, i) => (
        <div className="LastFmScore" key={i}>
          <div className="horizcont">
            <img alt="PFP" src={score.image?.[2]?.["#text"]} className="pfp" />
            <div className="stats">
              <a href={score.artist?.url} target="_blank" rel="noreferrer">
                <div className="artistHolder">
                  <img
                    alt="PFP"
                    src={score.artist?.image?.[1]?.["#text"]}
                    className="artist"
                  />
                  <span>{score.artist?.name}</span>
                </div>
              </a>
              <div className="title">
                <a href={score.url} target="_blank" rel="noreferrer">
                  {score.loved === "1" ? "❤️ " : ""}
                  <span>{score.name}</span>
                </a>
              </div>
              <div className="creationName">
                <span>
                  Featured in <i>{score.album?.["#text"]}</i>
                </span>
                <span> • </span>
                <span>
                  {score["@attr"]?.nowplaying
                    ? `Now Playing`
                    : `Played ${new Date(
                        score.date?.uts * 1000
                      ).toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LastFmScores;
