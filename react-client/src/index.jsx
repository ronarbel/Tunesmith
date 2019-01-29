import React from 'react';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loopNumber: 0,
      previousLoopNumber: 0,
      displayKeys: false,
      drum1Status: 'inactive',
      drum1LastQueuedAt: null,
      drum2Status: 'inactive',
      drum2LastQueuedAt: null,
      drum3Status: 'inactive',
      drum3LastQueuedAt: null,
      drum4Status: 'inactive',
      drum4LastQueuedAt: null,
      melody1Status: 'inactive',
      melody1LastQueuedAt: null,
      melody2Status: 'inactive',
      melody2LastQueuedAt: null,
      melody3Status: 'inactive',
      melody3LastQueuedAt: null,
      melody4Status: 'inactive',
      melody4LastQueuedAt: null,
      melody5Status: 'inactive',
      melody5LastQueuedAt: null,
      melody6Status: 'inactive',
      melody6LastQueuedAt: null,
      melody7Status: 'inactive',
      melody7LastQueuedAt: null,
      melody8Status: 'inactive',
      melody8LastQueuedAt: null,
      melody9Status: 'inactive',
      bass1Status: 'inactive',
      bass1LastQueuedAt: null,
      bass2Status: 'inactive',
      bass2LastQueuedAt: null,
      bass3Status: 'inactive',
      bass3LastQueuedAt: null,
      bass4Status: 'inactive',
      bass4LastQueuedAt: null,
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

    toggleDisplay() {
      const { displayKeys } = this.state;
      this.setState({ displayKeys: !displayKeys });
    }

  render() {
    const {
      displayKeys,
      drum1Status,
      drum2Status,
      drum3Status,
      drum4Status,
      melody1Status,
      melody2Status,
      melody3Status,
      melody4Status,
      melody5Status,
      melody6Status,
      melody7Status,
      melody8Status,
      melody9Status,
      bass1Status,
      bass2Status,
      bass3Status,
      bass4Status,
    } = this.state;

    const drum1ClassName = `${drum1Status} `.concat('drum pad');
    const drum2ClassName = `${drum2Status} `.concat('drum pad');
    const drum3ClassName = `${drum3Status} `.concat('drum pad');
    const drum4ClassName = `${drum4Status} `.concat('drum pad');
    const melody1ClassName = `${melody1Status} `.concat('melody pad');
    const melody2ClassName = `${melody2Status} `.concat('melody pad');
    const melody3ClassName = `${melody3Status} `.concat('melody pad');
    const melody4ClassName = `${melody4Status} `.concat('melody pad');
    const melody5ClassName = `${melody5Status} `.concat('melody pad');
    const melody6ClassName = `${melody6Status} `.concat('melody pad');
    const melody7ClassName = `${melody7Status} `.concat('melody pad');
    const melody8ClassName = `${melody8Status} `.concat('melody pad');
    const melody9ClassName = `${melody9Status} `.concat('melody pad');
    const bass1ClassName = `${bass1Status} `.concat('bass pad');
    const bass2ClassName = `${bass2Status} `.concat('bass pad');
    const bass3ClassName = `${bass3Status} `.concat('bass pad');
    const bass4ClassName = `${bass4Status} `.concat('bass pad');

    const soundLinks = {
      drum1: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194",
      drum2: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.4.ogg?1427136627194",
      drum3: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.2.ogg?1427136627194",
      drum4: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.3.ogg?1427136627194",
      melody1: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.1.ogg?1427136627194",
      melody2: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.11.ogg?1427136627194",
      melody3: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.10.ogg?1427136627194",
      melody4: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.4.ogg?1427136627194",
      melody5: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.5.ogg?1427136627194",
      melody6: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.6.ogg?1427136627194",
      melody7: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.7.ogg?1427136627194",
      melody8: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.8.ogg?1427136627194",
      melody9: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/sounds.1.9.ogg?1427136627194",
      bass1: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.1.ogg?1427136627194",
      bass2: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.2.ogg?1427136627194",
      bass3: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.5.ogg?1427136627194",
      bass4: "https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.4.ogg?1427136627194",
    };
    
    return (
      <div id="app">
        <div id="player">
          <div className="flex-container">
            <div className="drums">
              <div>
                <button type="button" className={drum1ClassName} value="drum1" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('3') : ('')}</button>
                <Sound
                  url={soundLinks.drum1}
                  playStatus={drum1Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={drum2ClassName} value="drum2" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('E') : ('')}</button>
                <Sound
                  url={soundLinks.drum2}
                  playStatus={drum2Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={drum3ClassName} value="drum3" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('D') : ('')}</button>
                <Sound
                  url={soundLinks.drum3}
                  playStatus={drum3Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={drum4ClassName} value="drum4" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('C') : ('')}</button>
                <Sound
                  url={soundLinks.drum4}
                  playStatus={drum4Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
            </div>
            <div className="melodies grid-container">
              <div className="top-row">
                <div>
                  <button type="button" className={melody1ClassName} value="melody1" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('R') : ('')}</button>
                  <Sound
                    url={soundLinks.melody1}
                    playStatus={melody1Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody2ClassName} value="melody2" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('T') : ('')}</button>
                  <Sound
                    url={soundLinks.melody2}
                    playStatus={melody2Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody3ClassName} value="melody3" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('Y') : ('')}</button>
                  <Sound
                    url={soundLinks.melody3}
                    playStatus={melody3Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
              </div>
              <div className="middle-row">
                <div>
                  <button type="button" className={melody4ClassName} value="melody4" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('F') : ('')}</button>
                  <Sound
                    url={soundLinks.melody4}
                    playStatus={melody4Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody5ClassName} value="melody5" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('G') : ('')}</button>
                  <Sound
                    url={soundLinks.melody5}
                    playStatus={melody5Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody6ClassName} value="melody6" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('H') : ('')}</button>
                  <Sound
                    url={soundLinks.melody6}
                    playStatus={melody6Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
              </div>
              <div className="bottom-row">
                <div>
                  <button type="button" className={melody7ClassName} value="melody7" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('V') : ('')}</button>
                  <Sound
                    url={soundLinks.melody7}
                    playStatus={melody7Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody8ClassName} value="melody8" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('B') : ('')}</button>
                  <Sound
                    url={soundLinks.melody8}
                    playStatus={melody8Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
                <div>
                  <button type="button" className={melody9ClassName} value="melody9" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('N') : ('')}</button>
                  <Sound
                    url={soundLinks.melody9}
                    playStatus={melody9Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                    playFromPosition={0}
                    autoLoad={true}
                  />
                </div>
              </div>
            </div>
            <div className="basses grid-container">
              <div>
                <button type="button" className={bass1ClassName} value="bass1" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('7') : ('')}</button>
                <Sound
                  url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.1.ogg?1427136627194"
                  playStatus={bass1Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={bass2ClassName} value="bass2" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('U') : ('')}</button>
                <Sound
                  url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.2.ogg?1427136627194"
                  playStatus={bass2Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={bass3ClassName} value="bass3" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('J') : ('')}</button>
                <Sound
                  url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.3.ogg?1427136627194"
                  playStatus={bass3Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
              <div>
                <button type="button" className={bass4ClassName} value="bass4" onClick={e => this.toggleSoundClipStatus(e.target.value)}>{displayKeys ? ('M') : ('')}</button>
                <Sound
                  url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/bass.1.4.ogg?1427136627194"
                  playStatus={bass4Status === 'active' ? (Sound.status.PLAYING) : (Sound.status.STOPPED)}
                  playFromPosition={0}
                  autoLoad={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="showKeyboard" onClick={this.toggleDisplay}>Show Keyboard Controls</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
