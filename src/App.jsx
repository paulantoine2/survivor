import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import GameScreen from './screens/Game/GameScreen';
import LoginScreen from './screens/Login/LoginScreen';
import LobbyScreen from './screens/Lobby/LobbyScreen';
import { auth } from './services/firebase';
import { CircularProgress } from '@material-ui/core';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true,
      user: null,
    };
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
          user,
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
          user: null,
        });
      }
    });
  }
  render() {
    return this.state.loading === true ? (
      <CircularProgress />
    ) : (
      <Router>
        <PrivateRoute path="/play" component={GameScreen} authenticated={this.state.authenticated} user={this.state.user} />
        <PublicRoute path="/login" component={LoginScreen} authenticated={this.state.authenticated} />
        <PrivateRoute exact path="/" component={LobbyScreen} authenticated={this.state.authenticated} user={this.state.user} />
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, authenticated, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? (
          <Component {...props} user={user} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return <Route {...rest} render={(props) => (authenticated === false ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export default App;
