import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Sound from 'react-sound';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: Sound.status.STOPPED,
    };

    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data,
    //     });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });

  }
  
  playSound() {
    this.setState({ playStatus: Sound.status.PLAYING });
  }

  render() {
    const { playStatus } = this.state;
    return (
      <div>
        <h1>Item List</h1>
        {/* <List items={this.state.items} /> */}
        <button type="button" onClick={this.playSound}> Play </button>
        <Sound
          url="https://www.madeon.fr/adventuremachine/wmas/assets/audio/drum.1.6.ogg?1427136627194"
          playStatus={playStatus}
          onFinishedPlaying={this.playSound}
          // playFromPosition={300 /* in milliseconds */}
          // onLoading={this.handleSongLoading}
          // onPlaying={this.handleSongPlaying}
          // onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
