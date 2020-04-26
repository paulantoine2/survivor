import React from 'react';
import { Container, Typography, TextField, Button, Grid, CircularProgress, Checkbox } from '@material-ui/core';
import { turnOnPresence, turnOffPresence } from '../../helpers/presence';
import {
  subscribeMessages,
  subscribePlayers,
  sendMessage,
  quitGameRoom,
  updatePlayer,
  getCurrentRoom,
} from '../../helpers/gameRoom';

export default class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      players: [],
      typed: '',
      loading: true,
    };
    this.gameRoom = null;
    this.roomId = null;
  }
  async componentDidMount() {
    const { user, history } = this.props;
    this.roomId = await getCurrentRoom(user.uid);
    if (!this.roomId) return history.push('/');
    await turnOnPresence(this.roomId);
    subscribePlayers(this.roomId, (players) => this.setState({ players }));
    subscribeMessages(this.roomId, (messages) => this.setState({ messages }));
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
  handleQuit = async (event) => {
    await turnOffPresence(this.roomId);
    await quitGameRoom(this.roomId, this.props.user.uid);
    this.props.history.push('/');
  };
  handleReady = async (event) => {
    await updatePlayer(this.roomId, this.props.user.uid, {
      ready: event.target.checked,
    });
  };

  render() {
    const { email, uid } = this.props.user;
    return this.state.loading === true ? (
      <CircularProgress />
    ) : (
      <Container component="main">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div>
              <Typography component="h1" variant="h5">
                Partie
              </Typography>
              <div>Bienvenue {email}</div>
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
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
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
