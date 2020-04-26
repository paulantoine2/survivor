import React from 'react';
import { Container, Typography, TextField, Button, Grid, CircularProgress, Checkbox } from '@material-ui/core';
import { db } from '../../services/firebase';
import { firestore } from 'firebase/app';
import setupPresence from '../../helpers/setupPresence';

export default class GameScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      players: [],
      typed: '',
      loading: true,
      gameRoom: null,
    };
    this.gameRoom = null;
  }
  componentDidMount() {
    const { user, history } = this.props;
    db.collectionGroup('players')
      .where('userId', '==', user.uid)
      .get()
      .then(async (docs) => {
        if (!docs.size) return history.push('/');
        let roomId = null;
        docs.forEach((doc) => {
          roomId = doc.ref.parent.parent.id;
        });
        await setupPresence(roomId);
        this.gameRoom = db.collection('gameRoom').doc(roomId);
        this.gameRoom
          .collection('messages')
          .orderBy('timestamp')
          .onSnapshot((querySnapshot) => {
            let messages = [];
            querySnapshot.forEach(function (doc) {
              messages.push({
                message: doc.data().message,
                id: doc.id,
              });
            });
            this.setState({ messages });
          });
        this.gameRoom.collection('players').onSnapshot((querySnapshot) => {
          let players = [];
          querySnapshot.forEach(function (doc) {
            players.push({
              username: doc.data().username,
              team: doc.data().team,
              status: doc.data().status,
              ready: doc.data().ready,
              id: doc.id,
            });
          });
          this.setState({ players });
        });
        this.setState({ loading: false });
      });
  }

  handleChange = (event) => {
    this.setState({
      typed: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { uid } = this.props.user;
    this.gameRoom
      .collection('messages')
      .doc()
      .set({
        message: this.state.typed,
        senderId: uid,
        timestamp: firestore.FieldValue.serverTimestamp(),
        messageType: 'TEXT',
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
    this.setState({ typed: '' });
  };
  handleQuit = (event) => {
    const { user, history } = this.props;
    this.gameRoom
      .collection('players')
      .doc(user.uid)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        history.push('/');
      });
  };
  handleReady = (event) => {
    const { checked } = event.target;
    const { user } = this.props;
    console.log('test');
    this.gameRoom.collection('players').doc(user.uid).update({
      ready: checked,
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
                  onChange={this.handleChange}
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
