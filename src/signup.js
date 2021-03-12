import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {signUpUser} from './api-utils';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '39c212be9cbf4cffae633afcac06a90f';
const redirectUri = 'https://algo-rhythm.netlify.app/spotify';
const scopes = ['playlist-read-private', 'playlist-read-collaborative'];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    verticalAlign: 'center',
    borderStyle: 'solid',
    borderColor: 'white',
    width: '25%',
    height: '350px',
    color: 'black',
    margin: '0 auto',
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: '40px',
    marginTop: '40px',

    '& > *': {
      margin: theme.spacing(1),
      width: '50%',
      background: '',
      opacity: 1
    }
  }
}));

export function Signup (props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = async (e) => {
    e.preventDefault();

    await setEmail(e.target.value);
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    await setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signUpUser(email, password);

      props.handleUserChange(user);
      window.location.replace(
        `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
          '%20'
        )}&response_type=token&show_dialog=true`
      );
    } catch (e) {
      setError(e.response.body.error);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h2>Sign-Up</h2>
      {error && (
        <h5 style={{color: 'red'}}>Uh oh, {error}, please try again!</h5>
      )}
      <TextField
        className={classes.child}
        id="standard-basic"
        label="Email"
        onChange={handleEmailChange}
      />
      <TextField
        id="standard-basic"
        label="Password"
        onChange={handlePasswordChange}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        SignUp!
      </Button>
    </form>
  );
}

// import React, { Component } from 'react';
// import { signUpUser } from './api-utils';

// export default class login extends Component {
//   state = {
//     email: '',
//     password: ''
//   };

//   handleEmailChange = (e) => this.setState({ email: e.target.value });

//   handlePasswordChange = (e) => this.setState({ password: e.target.value });

//   handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const user = await signUpUser(this.state.email, this.state.password);
//       console.log(user);
//       this.props.handleUserChange(user);
//       this.props.history.push('/spotify');
//     } catch (e) {
//       this.setState({ error: e.response.body });
//     }
//   };

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label>Email</label>
//           <input
//             value={this.state.email}
//             onChange={this.handleEmailChange}
//             type="email"
//           ></input>
//           <label>Password</label>
//           <input
//             value={this.state.password}
//             onChange={this.handlePasswordChange}
//             type="password"
//           ></input>
//           <button>Spotify Login</button>
//         </form>
//       </div>
//     );
//   }
// }
