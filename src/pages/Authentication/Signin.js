import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import React,{ useRef, useState , useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import { Redirect,useHistory } from 'react-router-dom';
import classNames from "classnames";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle'
import Api from '../../Api';
import { makeStyles } from "@material-ui/core/styles";
import { authenticationService } from '../../_services/authentication.service';

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  }
}));

// const api = axios.create({
//   baseURL : Api.url
// });




const Signin = () => {
  const history = useHistory()
  const handleRedirectMagang = () => {
    history.push('/magang')
  }
  const handleRedirectMentor = () => {
    history.push('/mentor')
  }
  const handleRedirect = () => {
    history.push('/supervisor')
  }
  const classes = useStyles();
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [state,setState] = useState(false);

  if(authenticationService.currentUserValue){
    const token = jwtDecode(authenticationService.currentUserValue.token);
    switch (token.role) {
      case 1:
        handleRedirect();
      break;
      case 2:
        handleRedirectMagang();
      break;
      case 3:
        handleRedirectMentor();
      break;
    }
  }

  function handleSubmit() {
    let errorList = [];
    if(email === undefined){
      errorList.push("Harap Isi Email");
    }
    if(password === undefined){
      errorList.push("Harap Isi Password");
    }
    if(errorList.length < 1){
      authenticationService.Login(email, password)
      .then(
          user => {
            if(user === 'incorrect'){
              errorList.push("Username atau Password Salah");
              setErrorMessages(errorList)
              setIserror(true)
            }else{
              const token = jwtDecode(authenticationService.currentUserValue.token);
              switch (token.role) {
                case 1:
                  handleRedirect();
                break;
                case 2:
                  handleRedirectMagang();
                break;
                case 3:
                  handleRedirectMentor();
                break;
              }
            }
          }
      );
    }else{
      setErrorMessages(errorList)
      setIserror(true)
    }
  }

  return (
    <div className={classNames(classes.session, classes.background)}>

      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>

            <CardContent>

              <form>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <Typography variant="h5">
                    InternApps
                  </Typography>
                  <br></br>
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/pelindo4.png`}
                    alt="" style = {{
                      width : "50%",
                      alignSelf: 'center'
                    }}
                    className="inline"
                  />
                  <br></br>
                  <div>
                    {iserror &&
                      <Alert severity="error">
                          {errorMessages.map((msg, i) => {
                              return <div key={i}>{msg}</div>
                          })}
                      </Alert>
                    }
                  </div>
                  <br></br>
                  <Typography variant="caption">
                    Login dengan email dan password
                  </Typography>
                </div>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  onChange = {e => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  onChange = {e => setPassword(e.target.value)}
                  name="password"
                  margin="normal"
                />
                {/* <FormControlLabel
                  control={<Checkbox value="checkedA" />}
                  label="Stayed logged in"
                  className={classes.fullWidth}
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick= {handleSubmit}
                  // type="submit"
                >
                  Login
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/forgot">
                    <Button>Forgot password?</Button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Link to="/signup">
                    <Button>Create new account.</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signin;
