import React from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

const Pad = ({ profile, toggleSoundClipStatus, displayKeys }) => {
  const { status, type, id, soundLink, keyBinding } = profile;

  return (
    <div className="pad">
      <button
        type="button"
        className={`${status} ${type} pad`}
        value={id}
        onClick={e => toggleSoundClipStatus(e.target.value)}
      >
        {displayKeys ? ({ keyBinding }) : ('')}
      </button>
      <Sound
        url={soundLink}
        playStatus={status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
        playFromPosition={0}
        autoLoad
      />
    </div>
  );
};

Pad.propTypes = {
  profile: PropTypes.instanceOf(Object).isRequired,
  toggleSoundClipStatus: PropTypes.func.isRequired,
  displayKeys: PropTypes.bool.isRequired,
};

export default Pad;
