import React from 'react';
import ReactDOM from 'react-dom';
import Sound from 'react-sound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drum1Active: false,
      drum1PlayStatus: Sound.status.STOPPED,
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

  toggleSound(sound) {
    console.log(sound);
    this.setState({ [sound]: !this.state[sound] });
  }

  render() {
    const { drum1PlayStatus } = this.state;
    return (
      <div>
        <button type="button" value="drum1Active" onClick={e => this.toggleSound(e.target.value)}> Drum1 </button>
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
