import React, { Component } from 'react';
import { Checkbox, Button } from '@material-ui/core';
import { turnOffPresence } from '../../helpers/presence';
import { quitGameRoom, updatePlayer, subscribePlayers } from '../../helpers/gameRoom';
import io from 'socket.io-client';

class WaitingScreen extends Component {
  socket = io('http://localhost:3000');
  constructor() {
    super();
    this.state = {
      players: [],
      loading: true,
    };
  }
  componentDidMount() {
    subscribePlayers(this.props.roomId, (players) => this.setState({ players }));
  }

  handleQuit = async (event) => {
    await turnOffPresence(this.props.roomId);
    await quitGameRoom(this.props.roomId, this.props.user.uid);
    this.props.history.push('/');
  };
  handleReady = async (event) => {
    await updatePlayer(this.props.roomId, this.props.user.uid, {
      ready: event.target.checked,
    });
  };
  render() {
    const { uid } = this.props.user;
    return (
      <>
        <ul>
          {this.state.players.map((p) => (
            <li key={p.id}>
              {p.id === uid ? (
                <Checkbox checked={p.ready} onChange={this.handleReady} />
              ) : (
                <Checkbox checked={p.ready} disabled />
              )}
              {p.username} - {p.status}
            </li>
          ))}
        </ul>
        <Button onClick={this.handleQuit} fullWidth variant="contained" color="secondary">
          Quitter la partie
        </Button>
      </>
    );
  }
}

export default WaitingScreen;
