import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { TableHead, Table, TableRow, TableCell, TableBody, Button, CircularProgress } from '@material-ui/core';
import io from 'socket.io-client';
import JoinGamePage from './JoinGame';

export default class LobbyPage extends React.Component {
  state = {
    loading: true,
    joinGame: false,
    alreadyInGame: !!localStorage.getItem('roomId'),
    rooms: [],
  };
  socket = io('http://localhost:3000/lobby');

  componentDidMount() {
    if (this.state.alreadyInGame) this.setState({ loading: false });
    else
      this.socket.on('load', (rooms) => {
        this.setState({
          rooms,
          loading: false,
        });
      });
  }

  handleJoin = (roomId) => {
    this.setState({ joinGame: true, roomId });
  };

  handleSubmitJoin = (data) => {
    this.socket.emit('joinGame', data, (playerId, roomId) => {
      localStorage.setItem('roomId', roomId);
      localStorage.setItem('playerId', playerId);
    });
  };

  render() {
    const { loading, joinGame, roomId, alreadyInGame } = this.state;
    if (loading) return <CircularProgress />;
    if (alreadyInGame)
      return (
        <Container>
          <Typography component="h1" variant="h5">
            Vous êtes déjà dans une partie
          </Typography>
          <Button color="primary" variant="contained" component={Link} to="/play">
            Rejoindre la partie en cours
          </Button>
        </Container>
      );
    if (joinGame)
      return (
        <JoinGamePage
          roomId={roomId}
          onBack={() => this.setState({ joinGame: false })}
          onSubmit={(data) => this.handleSubmitJoin(data)}
        />
      );
    return (
      <Container>
        <Typography component="h1" variant="h5">
          Lobby
        </Typography>
        <Button onClick={() => this.handleJoin()} color="primary" variant="outlined">
          Nouvelle partie
        </Button>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nb. joueurs</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell>{room._id}</TableCell>
                <TableCell>{room.players.length}</TableCell>
                <TableCell>
                  <Button onClick={() => this.handleJoin(room._id)} color="secondary" variant="outlined">
                    Rejoindre
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
