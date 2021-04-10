import React, { useEffect } from "react";
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlinedIcon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2'

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
    backgroundColor: '#141313',
  },
  customText: {
    color: 'white'
  },
  customButton: {
    marginBottom: 50,
    marginTop: 50
  }
}));

const Admin = ({auth, history, logoutUser}) => {;
  
  const classes = useStyles();
  
  // useEffect(() => {
  //   if(!auth.isAuthenticated){
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Authentication',
  //       text: 'You are not authenticated'
  //     });
  //     history.push('/');
  //   }
  //   else{
  //     if(!auth.admin){
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Authorization',
  //         text: 'You are not autorized'
  //       });
  //       history.push('/');
  //     }
  //   }
  // });

  const handleLogout = () =>{
    logoutUser();
    history.push('/');
  }

  return (
    <Container component="main" className={classes.customContainer}>
      {/* <Button onClick={handleLogout}>Logout</Button> */}
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className={classes.customText}>
          Admin
        </Typography>
        <NavLink exact to="/admin/apartments"  style={{width: 300}}><Button
            className={classes.customButton}
            fullWidth
            variant="contained"
            color="primary"
          >
            View Apartments
          </Button></NavLink>
          <NavLink exact to="/users" style={{width: 300}}><Button
            className={classes.customButton}
            fullWidth
            variant="contained"
            color="primary"
          >
            View Users
          </Button></NavLink>
      </div>
    </Container>
  );
}

export default withRouter(Admin);