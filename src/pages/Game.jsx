import React from 'react';
import { Container, Typography, CircularProgress, Button, Grid } from '@material-ui/core';
import WaitingScreen from '../components/GameScreens/WaitingScreen';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import Chat from '../components/Chat/Chat';

export default class GamePage extends React.Component {
  state = {
    roomId: localStorage.getItem('roomId'),
    playerId: localStorage.getItem('playerId'),
    loading: true,
    players: [],
    messages: [],
  };
  socket = io('http://localhost:3000/game');
  componentDidMount() {
    const { roomId, playerId } = this.state;
    this.socket.emit('arriving', { roomId, playerId });
    this.socket.on('loadPlayers', (players) => this.setState({ players, loading: false }));
    this.socket.on('loadMessages', (messages) => {
      console.log('message', messages);
      this.setState({ messages });
    });
  }
  handleReady = (event) => {
    this.socket.emit('changeReady', event.target.checked);
  };
  handleSend = (message) => {
    this.socket.emit('sendMessage', message);
  };

  render() {
    const { loading, roomId, playerId, players, messages } = this.state;
    if (!roomId) return <Redirect to="/"></Redirect>;
    return loading ? (
      <CircularProgress />
    ) : (
      <Container component="main">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Typography component="h1" variant="h5">
              Partie {roomId}
              <WaitingScreen players={players} playerId={playerId} handleReady={this.handleReady} />
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Chat elements={messages} handleSend={this.handleSend} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}
