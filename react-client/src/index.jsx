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
    this.queuedCleaning = this.queuedCleaning.bind(this);
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

      this.queuedCleaning(soundClip);
    }

    // if inactive, set to queued
    // run queue clearning funtion based on sound type limit
    //
    // already queued or active
    // straight to inactive
  }


  queuedCleaning(soundClip) {
    console.log('cleaning')
    let soundType = '';
    let soundTypeLimit = null;
    if (soundClip.startsWith('drum')) soundType = 'drum'; soundTypeLimit = 1;
    if (soundClip.startsWith('melody')) soundType = 'melody'; soundTypeLimit = 3;
    if (soundClip.startsWith('bass')) soundType = 'bass'; soundTypeLimit = 1;

    console.log('TYPE AND LIMIT: ', soundType, soundTypeLimit);
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
