import React from "react";
import "./MediaBox.css";

function MediaBox({
  icon,
  link,
  color,
  iconPack,
  name,
}: {
  icon: string;
  link: string;
  iconPack?: string;
  color: string;
  name: string;
}) {
  return (
    <a className="MediaBox" href={link}>
      <img
        alt={name}
        height="48"
        src={`https://img.icons8.com/${
          iconPack ?? "windows"
        }/48/${color}/${icon}.png`}
      />
    </a>
  );
}

export default MediaBox;
