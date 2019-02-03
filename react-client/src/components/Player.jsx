import React from 'react';
import PropTypes from 'prop-types';
import Pad from './Pad.jsx';

const Player = ({ state, toggleSoundClipStatus }) => {
  const { displayKeys } = state;
  const padProfiles = [
    state.drum1,
    state.drum2,
    state.drum3,
    state.drum4,
    state.melody1,
    state.melody2,
    state.melody3,
    state.melody4,
    state.melody5,
    state.melody6,
    state.melody7,
    state.melody8,
    state.melody9,
    state.bass1,
    state.bass2,
    state.bass3,
    state.bass4,
  ];

  const pads = padProfiles.map((padProfile) => {
    return (
      <Pad
        profile={padProfile}
        toggleSoundClipStatus={toggleSoundClipStatus}
        displayKeys={displayKeys}
        key={padProfile.id}
      />
    );
  });

  return (
    <div className="player">{pads}</div>
  );
};

Player.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  toggleSoundClipStatus: PropTypes.func.isRequired,
};

export default Player;
