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
    <a className="MediaBox" href={link} target="_blank" rel="noreferrer">
      <img
        alt={name}
        title={name}
        height="48"
        src={`https://img.icons8.com/${
          iconPack ?? "windows"
        }/48/${color}/${icon}.png`}
      />
    </a>
  );
}

export default MediaBox;
