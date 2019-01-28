import React from 'react';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drum1Status: 'inactive',
      drum2Status: 'inactive',
    };

    this.playSounds = this.playSounds.bind(this);
    this.toggleSound = this.toggleSound.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.playSounds, 4363.628000000001);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  playSounds() {
    const newState = {};
    const {
      drum1Active,
    } = this.state;

    if (drum1Active) {
      newState.drum1PlayStatus = Sound.status.PLAYING;
    }
    this.setState(newState);
  }

  toggleSongClipStatus(soundClip) {
    const soundClipStatusKey = soundClip += 'Status'
    const oldSoundClipStatus = this.state[soundClipStatusKey];

    if (oldSoundClipStatus === 'inactive') {
      this.setState({})
    }
  }

  queued 

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
