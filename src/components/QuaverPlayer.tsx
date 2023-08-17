import { useEffect, useState } from "react";
import "./QuaverPlayer.css";

function QuaverPlayer({ id }: { id: string }) {
  const [player, setPlayer] = useState({} as { [key: string]: any });
  async function getPlayer() {
    setPlayer(
      (
        await (
          await fetch("https://api.quavergame.com/v1/users/full/" + id)
        ).json()
      ).user
    );
  }
  useEffect(() => {
    getPlayer();
  }, []);
  return (
    <div className="Profile">
      <img alt="PFP" src={player.info?.avatar_url} className="pfp" />
      <div className="secondary">
        <span className="title">
          <a
            href={"https://quavergame.com/user/" + id}
            target="_blank"
            rel="noreferrer"
          >
            {player.info?.username}
          </a>
        </span>
        <div className="name">
          <span className="ipa">
            {player.info?.online
              ? "Online"
              : "Last online " +
                new Date(player.info?.latest_activity).toLocaleString()}
          </span>
        </div>
        <div className="name">
          <span className="ipa">
            Joined {new Date(player.info?.time_registered).toLocaleString()}
          </span>
        </div>
        <div className="name">
          <span className="ipa">
            #{player.keys4?.countryRank} in 4K for {player.info?.country}
          </span>
          <span>•</span>
          <span className="ipa">
            #{player.keys4?.globalRank} in 4K globally
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuaverPlayer;
