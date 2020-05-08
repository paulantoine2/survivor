import React, { Component } from 'react';
import { Checkbox, Button } from '@material-ui/core';

class WaitingScreen extends Component {
  handleQuit = () => {
    localStorage.removeItem('roomId');
    localStorage.removeItem('playerId');
  };
  render() {
    const { playerId, players } = this.props;
    return (
      <>
        <ul>
          {players.map((p) => (
            <li key={p._id}>
              {p._id === playerId ? (
                <Checkbox checked={p.ready} onChange={this.props.handleReady} />
              ) : (
                <Checkbox checked={p.ready} disabled />
              )}
              {p.userName} - {p.online ? 'Online' : 'Offline'}
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
