import React from 'react';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drum1Status: 'inactive',
      drum1LastQueuedAt: null
      drum2Status: 'inactive',
    };

    this.playSounds = this.playSounds.bind(this);
    this.toggleSoundClipStatus = this.toggleSoundClipStatus.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.playSounds, 4363.628000000001);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  playSounds() {
    // activateQueuedForType(drum)
    // activateQueuedForType(melody)
    // activateQueuedForType(bass)
  }

  // activateQueuedForType(type)
    // create soundClipTypeLimits object, drum:1, melody:3, bass:1
    // fetch everything queued and active for that type
    // sort on time stamp
    // slice on type limit
    // set active for winners
    // set inacative for losers


  toggleSoundClipStatus(soundClip) {
    const soundClipStatusKey = soundClip += 'Status'
    const oldSoundClipStatus = this.state[soundClipStatusKey];

    if (oldSoundClipStatus === 'inactive') {
      this.setState({})
    }
    // if inactive, set to queued
    // run queue clearning funtion based on sound type limit
    //
    // already queued or active
    // straight to inactive
  }

  // queued clearning
    //  take everything of sound type that is queued
    // sort on last queued at
    // slice on type limit
    // set losers to inactive
    

  render() {
    const { drum1PlayStatus } = this.state;
    return (
      <div>
        <button type="button" value="drum1" onClick={e => this.toggleSampleStatus(e.target.value)}> Drum1 </button>
        <Sound
          url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194"
          playStatus={drum1PlayStatus}
          playFromPosition={0}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
