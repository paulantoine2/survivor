import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { auth } from '../services/firebase';

export default class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: [],
      password: '',
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    await auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      if (error.code === 'auth/operation-not-allowed') {
        alert('You must enable Anonymous auth in the Firebase Console.');
      } else {
        console.error(error);
      }
    });
  };
  render() {
    return (
      <Container component="main" maxWidth="xs">
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Connexion à la partie
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="email"
            autoFocus
            onChange={this.handleChange}
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            onChange={this.handleChange}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Jouer
          </Button>
        </form>
      </Container>
    );
  }
}
