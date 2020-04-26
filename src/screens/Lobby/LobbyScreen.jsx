import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { db, auth } from '../../services/firebase';
import { joinGameRoom, fetchRooms } from '../../helpers/gameRoom';
import { TableHead, Table, TableRow, TableCell, TableBody, Button, CircularProgress } from '@material-ui/core';

export default class LobbyScreen extends React.Component {
  gameRoom = db.collection('gameRoom');
  constructor() {
    super();
    this.state = {
      loading: true,
      rooms: [],
    };
  }
  async componentDidMount() {
    const { user, history } = this.props;
    await db
      .collectionGroup('players')
      .where('userId', '==', user.uid)
      .get()
      .then((docs) => {
        if (docs.size) return history.push('/play');
      });
    this.setState({ rooms: await fetchRooms(), loading: false });
  }

  handleJoin = async (roomId) => {
    const { user, history } = this.props;
    this.setState({ loading: true });
    await joinGameRoom(roomId, user.uid, user.email);
    history.push('/play');
  };

  handleLogout = (event) => {
    auth.signOut();
  };

  render() {
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <Container>
        <Typography component="h1" variant="h5">
          Lobby
        </Typography>
        <Button onClick={this.handleLogout} color="secondary">
          Se deconnecter
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
              <TableRow key={room.id}>
                <TableCell>{room.id}</TableCell>
                <TableCell>{room.players}</TableCell>
                <TableCell>
                  <Button onClick={() => this.handleJoin(room.id)}>Rejoindre</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}
