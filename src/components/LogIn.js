import React, { useState, Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlinedIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import login from '../services/logInService';
import AdminComponent from './AdminComponent';
import { Redirect, withRouter } from 'react-router';
import { Apartment } from "@material-ui/icons";
import Swal from 'sweetalert2'
import Admin from "./AdminComponent";
// import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label } from 'reactstrap';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customInput: {
    backgroundColor: '#3d3a3a',
    borderRadius: 15,
    border: '0.7px solid #3d3a3a',
    color: '#ffffff',
  },
  customContainer: {
    backgroundColor: '#141313'
  },
  customText: {
    color: 'white'
  }
}));

const LogIn = ({loginUser, auth, history}) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const handleLogIn = async () => {
    let credentials = {
      'username': username,
      'password': password
    }

    loginUser(credentials).then(res => {
      if(auth.isAuthenticated){
        if(auth.admin){
          history.push('/admin');
        }
        else{
          history.push('/usersApartment');
        }
      }

      else{
        Swal.fire({
          icon: 'error',
          title: 'Authentication Failed',
          text: 'Wrong username or password'
        });
      }
    });
  }
  

  
  return (
    <Container component="main" maxWidth="xs" className={classes.customContainer}>
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar src="/broken-image.jpg" />
        <Typography component="h1" variant="h5" className={classes.customText}>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogIn}>
          <TextField
            className={classes.customInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            placeholder="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            className={classes.customInput}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={handleLogIn}
          >
            Log In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(LogIn);