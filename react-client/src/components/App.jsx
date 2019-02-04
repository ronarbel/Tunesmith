import React from 'react';
import Player from './Player.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loopNumber: 0,
      previousLoopNumber: 0,
      displayKeys: false,
      drum1: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194',
        type: 'drum',
        id: 'drum1',
      },
      drum2: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.4.ogg?1427136627194',
        type: 'drum',
        id: 'drum2',
      },
      drum3: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.2.ogg?1427136627194',
        type: 'drum',
        id: 'drum3',
      },
      drum4: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.3.ogg?1427136627194',
        type: 'drum',
        id: 'drum4',
      },
      melody1: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.1.ogg?1427136627194',
        type: 'melody',
        id: 'melody1',
      },
      melody2: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.11.ogg?1427136627194',
        type: 'melody',
        id: 'melody2',
      },
      melody3: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.10.ogg?1427136627194',
        type: 'melody',
        id: 'melody3',
      },
      melody4: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.4.ogg?1427136627194',
        type: 'melody',
        id: 'melody4',
      },
      melody5: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.5.ogg?1427136627194',
        type: 'melody',
        id: 'melody5',
      },
      melody6: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.6.ogg?1427136627194',
        type: 'melody',
        id: 'melody6',
      },
      melody7: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.7.ogg?1427136627194',
        type: 'melody',
        id: 'melody7',
      },
      melody8: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.8.ogg?1427136627194',
        type: 'melody',
        id: 'melody8',
      },
      melody9: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.9.ogg?1427136627194',
        type: 'melody',
        id: 'melody9',
      },
      bass1: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.1.ogg?1427136627194',
        type: 'bass',
        id: 'bass1',
      },
      bass2: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.2.ogg?1427136627194',
        type: 'bass',
        id: 'bass2',
      },
      bass3: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.5.ogg?1427136627194',
        type: 'bass',
        id: 'bass3',
      },
      bass4: {
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Q',
        keyBindingNumber: '17',
        soundLink: 'https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.4.ogg?1427136627194',
        type: 'bass',
        id: 'bass4',
      },
    };

    this.activateSounds = this.activateSounds.bind(this);
    this.toggleSoundClipStatus = this.toggleSoundClipStatus.bind(this);
    this.limitQueuedSoundClipByType = this.limitQueuedSoundClipByType.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    let { loopNumber } = this.state;
    const interval = 4363.628000000001;

    this.updateActiveSounds = setInterval(this.activateSounds, interval);
    this.updateLoopNumber = setInterval(() => { this.setState({ loopNumber: loopNumber += 1 }); }, interval);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { previousLoopNumber } = this.state;
    if (nextState.loopNumber > nextState.previousLoopNumber) {
      this.setState({ previousLoopNumber: previousLoopNumber += 1 });
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.updateActiveSounds);
    clearInterval(this.updateLoopNumber);
  }

  // for everything in queued, change to active
  activateSounds() {
    const { drum1, drum2, drum3, drum4, melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8, melody9, bass1, bass2, bass3, bass4 } = this.state;
    const profiles = [drum1, drum2, drum3, drum4, melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8, melody9, bass1, bass2, bass3, bass4];

    const toActiveProfiles = profiles.filter((profile) => {
      return profile.status === 'queued';
    });

    const activeProfiles = {};
    toActiveProfiles.forEach((profile) => {
      const oldProfile = this.state[profile.id];
      const newProfile = Object.assign({}, oldProfile);

      newProfile.status = 'active';
      activeProfiles[newProfile.id] = newProfile;
    });

    this.setState(activeProfiles);
  }

  // on click, change profile status to 'queued' or back to inactive.
  toggleSoundClipStatus(soundClip) {
    const oldProfile = this.state[soundClip];

    if (oldProfile.status === 'inactive') {
      const newProfile = Object.assign({}, oldProfile);
      newProfile.status = 'queued';
      newProfile.lastQueuedAt = Date.now();

      this.setState(
        { [soundClip]: newProfile }
      );
      setTimeout(() => this.limitQueuedSoundClipByType(newProfile.type), 0);
    }

    if (oldProfile.status === 'queued' || oldProfile.status === 'active') {
      const newProfile = Object.assign({}, oldProfile);
      newProfile.status = 'inactive';

      this.setState({ [soundClip]: newProfile });
    }
  }

  // ensure only latest launched can remain queued, all else return to inactivate
  limitQueuedSoundClipByType(filterType) {
    const soundClipTypeLimits = { drum: 1, melody: 3, bass: 1 };
    const { drum1, drum2, drum3, drum4, melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8, melody9, bass1, bass2, bass3, bass4 } = this.state;
    const profiles = [drum1, drum2, drum3, drum4, melody1, melody2, melody3, melody4, melody5, melody6, melody7, melody8, melody9, bass1, bass2, bass3, bass4];

    const queuedProfilesByType = profiles.filter((profile) => {
      return profile.type === filterType && profile.status === 'queued';
    });

    const sortedQueuedProfiles = queuedProfilesByType.sort((a, b) => {
      return b.lastQueuedAt - a.lastQueuedAt;
    });

    const toInactiveProfiles = sortedQueuedProfiles.slice(soundClipTypeLimits[filterType]);

    const inactiveProfiles = {};
    toInactiveProfiles.forEach((profile) => {
      const oldProfile = this.state[profile.id];
      const newProfile = Object.assign({}, oldProfile);

      newProfile.status = 'inactive';
      inactiveProfiles[newProfile.id] = newProfile;
    });

    this.setState(inactiveProfiles);
  }

  toggleDisplay() {
    const { displayKeys } = this.state;
    this.setState({ displayKeys: !displayKeys });
  }

  render() {
    return (
      <div id="app" className="flex-container">
        <Player
          state={this.state}
          toggleSoundClipStatus={this.toggleSoundClipStatus}
        />
        <div>
          <button type="button" className="showKeyboard" onClick={this.toggleDisplay}>Keyboard Controls</button>
        </div>
      </div>
    );
  }
}

export default App;
