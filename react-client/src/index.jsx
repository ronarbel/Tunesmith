import React from 'react';
import ReactDOM from 'react-dom';
import Pad from './components/Pad.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loopNumber: 0,
      previousLoopNumber: 0,
      displayKeys: false,
      drum1Profile: {
        name: 'drum1',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: '3',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194",
        type: 'drum',
      },
      drum2Profile: {
        name: 'drum2',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'E',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.4.ogg?1427136627194",
        type: 'drum',
      },
      drum3Profile: {
        name: 'drum3',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'D',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.2.ogg?1427136627194",
        type: 'drum',
      },
      drum4Profile: {
        name: 'drum4',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'C',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.3.ogg?1427136627194",
        type: 'drum',
      },
      melody1Profile: {
        name: 'melody1',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'R',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.1.ogg?1427136627194",
        type: 'melody',
      },
      melody2Profile: {
        name: 'melody2',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'F',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.11.ogg?1427136627194",
        type: 'melody',
      },
      melody3Profile: {
        name: 'melody3',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'V',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.10.ogg?1427136627194",
        type: 'melody',
      },
      melody4Profile: {
        name: 'melody4',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'T',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.4.ogg?1427136627194",
        type: 'melody',
      },
      melody5Profile: {
        name: 'melody5',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'G',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.5.ogg?1427136627194",
        type: 'melody',
      },
      melody6Profile: {
        name: 'melody6',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'B',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.6.ogg?1427136627194",
        type: 'melody',
      },
      melody7Profile: {
        name: 'melody7',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'Y',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.7.ogg?1427136627194",
        type: 'melody',
      },
      melody8Profile: {
        name: 'melody8',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'H',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.8.ogg?1427136627194",
        type: 'modely',
      },
      melody9Profile: {
        name: 'melody9',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'N',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.9.ogg?1427136627194",
        type: 'melody',
      },
      bass1Profile: {
        name: 'bass1',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: '7',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.1.ogg?1427136627194",
        type: 'bass',
      },
      bass2Profile: {
        name: 'bass2',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'U',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.2.ogg?1427136627194",
        type: 'bass',
      },
      bass3Profile: {
        name: 'bass3',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'J',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.5.ogg?1427136627194",
        type: 'bass',
      },
      bass4Profile: {
        name: 'bass4',
        status: 'inactive',
        lastQueuedAt: null,
        keyBinding: 'M',
        keyBindingNumber: '17',
        soundLink: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.4.ogg?1427136627194",
        type: 'bass',
      },
    };

    this.activateSounds = this.activateSounds.bind(this);
    this.toggleSoundClipStatus = this.toggleSoundClipStatus.bind(this);
    this.limitQueuedByType = this.limitQueuedByType.bind(this);
    this.activateQueuedForType = this.activateQueuedForType.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  componentDidMount() {
    let { loopNumber } = this.state;
    const interval = 4363.628000000001;

    this.updateActiveSounds = setInterval(this.activateSounds, interval);
    this.updateLoopNumber = setInterval(() => { this.setState({ loopNumber: loopNumber += 1 }); }, interval);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let { previousLoopNumber } = this.state;
  //   if (nextState.loopNumber > nextState.previousLoopNumber) {
  //     this.setState({ previousLoopNumber: previousLoopNumber += 1 });
  //     return true;
  //   }
  //   return false;
  // }

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

  toggleSoundClipStatus(soundClipProfile) {
    const oldProfile = this.state[soundClipProfile];
    
    if (oldProfile.status === 'inactive') {
      console.log(typeof oldProfile);
      const newProfile = { ...oldProfile };
      // newProfile.lastQueuedAt = Date.now();
      // this.setState({ newProfile });

      // move to end of event queue, able to recognize state already updated to queued
      setTimeout(() => { this.limitQueuedByType(soundClipProfile.type); }, 0);
    }

    if (oldProfile.status === 'queued' || oldProfile.status === 'active') {
      // const newProfile = { ...oldProfile, status: 'inactive' };
      // this.setState({ newProfile });
    }
  }

  limitQueuedByType(soundClipType) {
    const soundClipTypeLimits = { drum: 1, melody: 3, bass: 1 };

    console.log(soundClipType)
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
    const {
      displayKeys,
      drum1Profile,
      drum2Profile,
      drum3Profile,
      drum4Profile,
      melody1Profile,
      melody2Profile,
      melody3Profile,
      melody4Profile,
      melody5Profile,
      melody6Profile,
      melody7Profile,
      melody8Profile,
      melody9Profile,
      bass1Profile,
      bass2Profile,
      bass3Profile,
      bass4Profile,
    } = this.state;
    
    return (
      <div id="app">
        <div id="player">
          <div className="flex-container">
            <div className="drums">
              <Pad profile={drum1Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={drum2Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={drum3Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={drum4Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
            </div>
            <div className="melodies grid-container">
              <div className="top-row">
                <Pad profile={melody1Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody2Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody3Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              </div>
              <div className="middle-row">
                <Pad profile={melody4Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody5Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody6Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              </div>
              <div className="bottom-row">
                <Pad profile={melody7Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody8Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
                <Pad profile={melody9Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              </div>
            </div>
            <div className="basses grid-container">
              <Pad profile={bass1Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={bass2Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={bass3Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
              <Pad profile={bass4Profile} displayKeys={displayKeys} toggle={this.toggleSoundClipStatus} />
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="showKeyboard" onClick={this.toggleDisplay}>Keyboard Controls</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
