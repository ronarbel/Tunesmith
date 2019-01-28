import React from 'react';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drum1Status: 'inactive',
      drum1LastQueuedAt: null,
      drum2Status: 'inactive',
      drum2LastQueuedAt: null,
      drum3Status: 'inactive',
      drum3LastQueuedAt: null,
    };

    this.playSounds = this.playSounds.bind(this);
    this.toggleSoundClipStatus = this.toggleSoundClipStatus.bind(this);
    this.limitQueuedSoundClipTypeBySoundClip = this.limitQueuedSoundClipTypeBySoundClip.bind(this);
    this.activateQueuedForType = this.activateQueuedForType.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.playSounds, 4363.628000000001);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  playSounds() {
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

  // activateQueuedForType(type)
    // create soundClipTypeLimits object, drum:1, melody:3, bass:1
    // fetch everything queued and active for that type
    // sort on time stamp
    // slice on type limit
    // set active for winners
    // set inacative for losers

  
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

    // if inactive, set to queued
    // run queue cleaning funtion based on sound type limit
    //
    // already queued or active
    // straight to inactive
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

  // queued cleaning 
    //  take everything of sound type that is queued
    // sort on last queued at
    // slice on type limit
    // set losers to inactive


    

  render() {
    const {
      drum1Status,
      drum2Status,
      drum3Status,
    } = this.state;
    return (
      <div id="player">
        <div>
          <button type="button" value="drum1" onClick={e => this.toggleSoundClipStatus(e.target.value)}> Drum1 </button>
          <Sound
            url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194"
            playStatus={drum1Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
            playFromPosition={0}
          />
        </div>
        <div>
          <button type="button" value="drum2" onClick={e => this.toggleSoundClipStatus(e.target.value)}> Drum2 </button>
          <Sound
            url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.1.ogg?1427136627194"
            playStatus={drum2Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
            playFromPosition={0}
          />
        </div>
        <div>
          <button type="button" value="drum3" onClick={e => this.toggleSoundClipStatus(e.target.value)}> Drum3 </button>
          <Sound
            url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.2.ogg?1427136627194"
            playStatus={drum3Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
            playFromPosition={0}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
