import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { TableHead, Table, TableRow, TableCell, TableBody, Button, CircularProgress } from '@material-ui/core';

export default class LobbyPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      rooms: [],
    };
  }
  async componentDidMount() {}

  handleJoin = async (roomId) => {};

  render() {
    return this.state.loading ? (
      <CircularProgress />
    ) : (
      <Container>
        <Typography component="h1" variant="h5">
          Lobby
        </Typography>
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
