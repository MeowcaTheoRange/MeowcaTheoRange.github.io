import React from 'react';
import './Profile.css';
import ClockWidget from './ClockWidget';

function Profile() {
  return (
    <div className="Profile">
      <img alt="PFP" src="/assets/pfp.png" className="pfp" />
      <div className="secondary">
        <div className="name">MeowcaTheoRange <span className="ipa">/miaʊkəθɪoʊreɪnʤ/</span></div>
        <ClockWidget />
      </div>
    </div>
  );
}

export default Profile;