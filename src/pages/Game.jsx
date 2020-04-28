import React from 'react';
import { Container, Typography, TextField, Button, Grid, CircularProgress, Card } from '@material-ui/core';
import { turnOnPresence } from '../helpers/presence';
import { subscribeMessages, sendMessage, getCurrentRoom, subscribeGameroom, subscribePlayer } from '../helpers/gameRoom';
import { db } from '../services/firebase';
import WaitingScreen from '../components/GameScreens/WaitingScreen';
import Gage from '../components/Gage/Gage';

export default class GamePage extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: null,
      room: null,
      player: null,
      typed: '',
      loading: true,
    };
    this.roomId = null;
    this.unsubscribeScreen = null;
  }
  async componentDidMount() {
    const { user, history } = this.props;
    this.roomId = await getCurrentRoom(user.uid);
    if (!this.roomId) return history.push('/');
    await turnOnPresence(this.roomId);
    subscribeMessages(this.roomId, (messages) => this.setState({ messages }));
    subscribeGameroom(this.roomId, (room) => this.setState({ room }));
    subscribePlayer(this.roomId, user.uid, (player) => {
      if (!this.state.player || (this.state.player && this.state.player.screen.id !== player.screen.id)) {
        console.log('redefined');
        if (this.unsubscribeScreen) {
          this.unsubscribeScreen();
        }
        this.unsubscribeScreen = player.screen.onSnapshot((screen) => {
          console.log('screen.data() :>> ', screen.data());
        });
      }
      this.setState({ player });
    });
    this.setState({ loading: false });
  }

  handleType = (event) => {
    this.setState({
      typed: event.target.value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(this.roomId, this.props.user.uid, this.state.typed);
    this.setState({ typed: '' });
  };

  render() {
    const { email } = this.props.user;
    const { room, loading, player, messages } = this.state;
    return loading || !room || !messages || !player ? (
      <CircularProgress />
    ) : (
      <Container component="main">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <div>
              <Typography component="h1" variant="h5">
                Partie - {room ? room.sceneType : 'loading'}
              </Typography>
              <div>Bienvenue {email}</div>
              <Card>
                <WaitingScreen user={this.props.user} roomId={this.roomId} />
              </Card>
              <Gage max={6} value={player.stats.energy} />
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <div>
              {this.state.messages.map((m) => (
                <div key={m.id}>{m.message}</div>
              ))}
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="outlined-multiline-static"
                  label="Message"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleType}
                  value={this.state.typed}
                />
                <Button type="submit" fullWidth variant="contained" color="primary">
                  Envoyer
                </Button>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
