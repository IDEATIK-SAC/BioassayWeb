import React,{useState} from 'react';
import { Container, Grid ,CardMedia, Typography,TextField, Button} from "@material-ui/core"; 
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import {  loginUser } from '../../services/api/LoginService';
import { useStateValue } from "../../context/store";
import { withRouter } from 'react-router-dom';
import logoicon from '../logo.jpeg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Biossay
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
    alignItems: 'center'
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
    color: "white"
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [{usuarioSesion}, dispatch]  = useStateValue();

  const [ login , setLogin] = useState({
    Login:'',
    Password:''
  })

  const [ validateUserName, setValidateUserName] = useState({
    isError : false,
    Message : ''
  });
  
  const [ validatePassword, setValidatePassword] = useState({
    isError : false,
    Message : ''
  });

  const saveLogin = (e) =>{
    const { name , value} = e.target;
    setLogin((last) => ({
      ...last,
      [name]: value
    }))
  }

  const messageSnackbar = (msg) => {
    dispatch({
        type: "OPEN_SNACKBAR",
        openMessage: {
            open: true,
            message: msg
        }
    })
}

  const sendLogin = () =>{
    

    if(login.Login === ""){ 
      setValidateUserName({ isError : true, Message : 'Ingrese un nombre válido'})
    }
    else if(login.Password === "" ){
      setValidatePassword({ isError : true, Message : 'Ingrese una contraseña válida'})
    }else{
      loginUser(login , dispatch).then(response => {
        
        if(response.status === 200){
          props.history.push('/dashboard');
        }
      }).catch(error => {
        
        messageSnackbar("Compruebe su conexión a internet");
      });
    }


  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       
        <CardMedia 
         component="img"
                    alt="Biossay"
                    height="auto"
                    image={logoicon}
                />
        <Typography component="h1" variant="h5">
          Bienvenidos
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuario"
            name="Login"
            onChange={saveLogin}
            value={login.Login}
            autoComplete="email"
            autoFocus
            helperText={validateUserName.Message}
            error = {validateUserName.isError}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            onChange={saveLogin}
            fullWidth
            name="Password"
            value={login.Password}
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={validatePassword.Message}
            error = {validatePassword.isError}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={sendLogin}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid> 
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default withRouter(Login);