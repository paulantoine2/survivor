import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import JoinGamePage from './pages/JoinGame';
import LobbyPage from './pages/Lobby';
import { CircularProgress } from '@material-ui/core';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  componentDidMount() {}
  render() {
    return this.state.loading === true ? (
      <CircularProgress />
    ) : (
      <Router>
        <Route exact path="/">
          <LobbyPage />
        </Route>
        <Route exact path="/play">
          <JoinGamePage />
        </Route>
      </Router>
    );
  }
}

export default App;
