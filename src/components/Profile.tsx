import React from 'react';
import './Profile.css';
import ClockWidget from './ClockWidget';

function Profile({name, pronunciationMap, pronunciationMapSimple}:{name:string, pronunciationMap:string, pronunciationMapSimple:string}) {
  return (
    <div className="Profile">
      <img alt="PFP" src="/assets/pfp.png" className="pfp" />
      <div className="secondary">
        <div className="name">
          <span className="title">{name}</span>
          <div className="name">
            <span className="ipa"><a href={"http://ipa-reader.xyz/?text=" + pronunciationMap}>/{pronunciationMap}/</a></span>
            <span>•</span>
            <span className="ipa">{pronunciationMapSimple}</span>
          </div>
        </div>
        <ClockWidget />
      </div>
    </div>
  );
}

export default Profile;