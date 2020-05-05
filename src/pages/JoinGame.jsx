import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class JoinGamePage extends React.Component {
  state = {
    userName: '',
    strength: 0,
    agility: 0,
    survival: 0,
    swim: 0,
    roomId: null,
  };

  componentDidMount() {
    this.setState({ roomId: this.props.roomId });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };
  render() {
    const { strength, agility, survival, swim } = this.state;
    const { roomId, onBack } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Button onClick={onBack} color="primary" variant="outlined">
          Retour au lobby
        </Button>
        <Typography component="h1" variant="h4">
          {roomId ? `Rejoindre la partie ${roomId}` : `Nouvelle partie`}
        </Typography>
        <Typography component="h2" variant="h5">
          Quel joueur serez-vous ?
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Nom de joueur"
            name="userName"
            autoFocus
            onChange={this.handleChange}
          />
          <Typography id="discrete-slider" gutterBottom>
            Force
          </Typography>
          <Slider
            defaultValue={strength}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            onChange={(event, value) => this.setState({ strength: value })}
          />
          <Typography id="discrete-slider" gutterBottom>
            Agilité
          </Typography>
          <Slider
            defaultValue={agility}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            onChange={(event, value) => this.setState({ agility: value })}
          />
          <Typography id="discrete-slider" gutterBottom>
            Survie
          </Typography>
          <Slider
            defaultValue={survival}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            onChange={(event, value) => this.setState({ survival: value })}
          />
          <Typography id="discrete-slider" gutterBottom>
            Nage
          </Typography>
          <Slider
            defaultValue={swim}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={4}
            onChange={(event, value) => this.setState({ swim: value })}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Jouer
          </Button>
        </form>
      </Container>
    );
  }
}
