import React from 'react';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { CircularProgress } from '@material-ui/core';
import { authenticationService } from './services/authentification';

class App extends React.Component {
  state = {
    authenticated: false,
    loading: true,
    user: null,
  };
  componentDidMount() {
    authenticationService.currentUser.subscribe((user) => {
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
        <PrivateRoute path="/play" component={Game} authenticated={this.state.authenticated} user={this.state.user} />
        <PublicRoute path="/login" component={Login} authenticated={this.state.authenticated} />
        <PublicRoute path="/signup" component={Signup} authenticated={this.state.authenticated} />
        <PrivateRoute exact path="/" component={Lobby} authenticated={this.state.authenticated} user={this.state.user} />
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, authenticated, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Component {...props} user={user} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
    />
  );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return <Route {...rest} render={(props) => (authenticated === false ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export default App;
