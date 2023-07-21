import { useEffect, useState } from "react";
import "./LastFmPlayer.css";

function LastFmPlayer({ user, api_key }: { user: string; api_key: string }) {
  const [player, setPlayer] = useState({} as { [key: string]: any });
  async function getPlayer() {
    setPlayer(
      (
        await (
          await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${user}&api_key=${api_key}&format=json`
          )
        ).json()
      ).user
    );
  }
  useEffect(() => {
    getPlayer();
  }, []);
  return (
    <div className="Profile">
      <img alt="PFP" src={player.image?.[2]?.["#text"]} className="pfp" />
      <div className="secondary">
        <div className="name">
          <span className="title">
            <a href={player.url} target="_blank" rel="noreferrer">
              {player.realname}
            </a>
          </span>
          <div className="name">
            <span className="ipa">
              Began scrobbling{" "}
              {new Date(player.registered?.["#text"] * 1000).toLocaleString()}
            </span>
          </div>
          <div className="name">
            <span className="ipa">
              Played {player.track_count} unique songs out of {player.playcount}{" "}
              plays total
            </span>
            <span>•</span>
            <span className="ipa">
              Listened to {player.artist_count} artists total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastFmPlayer;
