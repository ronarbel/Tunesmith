import React from 'react';
import Sound from 'react-sound';

const Pad = ({ profile, displayKeys, toggle }) => {
  return (
    <div className="pad" key={`${profile.name}`}>
      <button
        type="button"
        className={`${profile.status} ${profile.type} pad`}
        value={`${profile.name}Profile`}
        onClick={e => toggle(e.target.value)}
      >
        {displayKeys ? ('3') : ('')}
      </button>
      <Sound
        url={profile.soundLink}
        playStatus={profile.status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
        playFromPosition={0}
        autoLoad={true}
      />
    </div>
  );
};

export default Pad;
