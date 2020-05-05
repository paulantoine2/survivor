import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LobbyPage from './pages/Lobby';
import GamePage from './pages/Game';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/">
          <LobbyPage />
        </Route>
        <Route exact path="/play">
          <GamePage />
        </Route>
      </Router>
    );
  }
}

export default App;
