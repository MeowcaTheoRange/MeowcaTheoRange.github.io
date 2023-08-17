import "./Profile.css";

function Profile({
  name,
  pronunciationMap,
  pronunciationMapSimple,
  pronouns,
  birthday,
  age,
}: {
  name: string;
  pronunciationMap: string;
  pronunciationMapSimple: string;
  pronouns: string;
  birthday: string;
  age: string;
}) {
  return (
    <div className="Profile">
      <img alt="PFP" src="/assets/pfp.png" className="pfp" />
      <div className="secondary">
        <span className="title">{name}</span>
        <div className="name">
          <span className="ipa">{pronouns}</span>
          <span>•</span>
          <span className="ipa">{age}</span>
          <span>•</span>
          <span className="ipa">{birthday}</span>
        </div>
        <div className="name">
          <span className="ipa">
            <a href={"http://ipa-reader.xyz/?text=" + pronunciationMap}>
              /{pronunciationMap}/
            </a>
          </span>
          <span>•</span>
          <span className="ipa">{pronunciationMapSimple}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
