import { useEffect, useState } from "react";
import "./TrollCallProfile.css";

function TrollCallProfile({ name }: { name: string }) {
  const [player, setPlayer] = useState({} as { [key: string]: any });
  async function getPlayer() {
    setPlayer(
      await (await fetch("https://trollcall.xyz/api/user/" + name)).json()
    );
  }
  useEffect(() => {
    getPlayer();
  }, []);
  console.log(player);
  return (
    <div className="TrollCallProfile">
      <img alt="PFP" src={player.pfp} className="pfp" />
      <div className="secondary">
        <span className="title">
          <a
            href={"https://trollcall.xyz/user/" + player.name}
            target="_blank"
            rel="noreferrer"
          >
            {player.name}
          </a>
        </span>
        <div className="name">
          <a
            href={
              "https://trollcall.xyz/hiveswap/trueSign/" + player.trueSign?.name
            }
          >
            {player.trueSign?.name} ({player.trueSign?.color.sign} -{" "}
            {player.trueSign?.color.dates.join("–")})
          </a>
        </div>
        <div className="name">
          {player.flairs?.map((x: any) => x.name).join(", ")}
        </div>
      </div>
    </div>
  );
}

export default TrollCallProfile;
