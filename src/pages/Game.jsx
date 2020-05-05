import React from 'react';
import { Container, Typography, TextField, Button, Grid, CircularProgress, Card } from '@material-ui/core';
import WaitingScreen from '../components/GameScreens/WaitingScreen';
import Gage from '../components/Gage/Gage';
import { Redirect } from 'react-router-dom';

export default class GamePage extends React.Component {
  state = {
    roomId: localStorage.getItem('roomId'),
    playerId: localStorage.getItem('playerId'),
    loading: false,
  };

  render() {
    const { loading, roomId } = this.state;
    if (!roomId) return <Redirect to="/"></Redirect>;
    return loading ? (
      <CircularProgress />
    ) : (
      <Container>
        <Typography component="h1" variant="h5">
          Partie {roomId}
        </Typography>
      </Container>
    );
  }
}
