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
    this.limitQueuedSoundClipTypeBySoundClip = this.limitQueuedSoundClipTypeBySoundClip.bind(this);
    this.activateQueuedForType = this.activateQueuedForType.bind(this);
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

  activateSounds() {
    this.activateQueuedForType('drum');
    this.activateQueuedForType('melody');
    this.activateQueuedForType('bass');
  }

  activateQueuedForType(type) {
    const soundClipTypeLimits = { drum: 1, melody: 3, bass: 1 };
    const queuedAndActiveTimeStamps = [];

    for (let i = 1; i <= 16; i += 1) {
      if (this.state[`${type}${i}Status`] === 'queued' || this.state[`${type}${i}Status`] === 'active') {
        queuedAndActiveTimeStamps.push({
          name: `${type}${i}`,
          LastQueuedAt: this.state[`${type}${i}LastQueuedAt`]
        });
      }
    }

    queuedAndActiveTimeStamps.sort((a, b) => {
      return b.LastQueuedAt - a.LastQueuedAt;
    });

    const toActivateArray = queuedAndActiveTimeStamps.slice(0, soundClipTypeLimits[type]);
    const toInactivateArray = queuedAndActiveTimeStamps.slice(soundClipTypeLimits[type]);

    const activeSounds = {};
    const inactiveSounds = {};

    toActivateArray.forEach((soundClip) => {
      activeSounds[`${soundClip.name}Status`] = 'active';
    });
    toInactivateArray.forEach((soundClip) => {
      inactiveSounds[`${soundClip.name}Status`] = 'inactive';
    });

    this.setState(activeSounds);
    this.setState(inactiveSounds);
  }
  
  toggleSoundClipStatus(soundClip) {
    const soundClipStatusKey = soundClip.slice().concat('Status');
    const soundClipLastQueuedAtKey = soundClip.slice().concat('LastQueuedAt');
    const oldSoundClipStatus = this.state[soundClipStatusKey];

    if (oldSoundClipStatus === 'inactive') {
      this.setState({
        [soundClipStatusKey]: 'queued',
        [soundClipLastQueuedAtKey]: Date.now(),
      });
      
      // move to end of event queue, able to recognize state already updated to queued
      setTimeout(() => { this.limitQueuedSoundClipTypeBySoundClip(soundClip); }, 0);
    }

    if (oldSoundClipStatus === 'queued' || oldSoundClipStatus === 'active') {
      this.setState({
        [soundClipStatusKey]: 'inactive',
      });
    }
  }

  // ensure only latest launched can remain queued, all else inactivate
  limitQueuedSoundClipTypeBySoundClip(soundClip) {
    const soundClipTypeLimits = { drum: 1, melody: 3, bass: 1 };
    let soundClipType = '';

    if (soundClip.startsWith('drum')) soundClipType = 'drum';
    if (soundClip.startsWith('melody')) soundClipType = 'melody';
    if (soundClip.startsWith('bass')) soundClipType = 'bass';

    // ----------------------- //

    const queuedTimeStamps = [];

    for (let i = 1; i <= 16; i += 1) {
      if (this.state[`${soundClipType}${i}Status`] === 'queued') {
        queuedTimeStamps.push({
          name: `${soundClipType}${i}`,
          LastQueuedAt: this.state[`${soundClipType}${i}LastQueuedAt`]
        });
      }
    }

    queuedTimeStamps.sort((a, b) => {
      return b.LastQueuedAt - a.LastQueuedAt;
    });

    const toInactivateArray = queuedTimeStamps.slice(soundClipTypeLimits[soundClipType]);
    const inactiveSounds = {};

    toInactivateArray.forEach((queuedSoundClip) => {
      inactiveSounds[`${queuedSoundClip.name}Status`] = 'inactive';
    });

    this.setState(inactiveSounds);
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
