import React,{useState} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Api from '../../Api';
import {authenticationService} from "../../_services/authentication.service";
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const api = axios.create({
  baseURL: Api.url
});

// Menampilkan Kekuatan Password
const hasNumber = value => {
   return new RegExp(/[0-9]/).test(value);
}
const hasMixed = value => {
   return new RegExp(/[a-z]/).test(value) &&
            new RegExp(/[A-Z]/).test(value);
}
const hasSpecial = value => {
   return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
}
export const strengthColor = count => {
   if (count < 2)
      return 'red';
   if (count < 3)
      return 'yellow';
   if (count < 4)
      return 'orange';
   if (count < 5)
      return 'lightgreen';
   if (count < 6)
      return 'green';
}
export const strengthIndicator = value => {
   let strengths = 0;
   if (value.length > 5)
      strengths++;
   if (value.length > 7)
      strengths++;
   if (hasNumber(value))
      strengths++;
   if (hasSpecial(value))
      strengths++;
   if (hasMixed(value))
      strengths++;
   return strengths;
}

const UbahPassword = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
  const [showPassword, setShowPassword] = useState(false);
  const [color,setColor] = useState("red");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [disable,setDisable] = useState(true);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  let kekuatan_password = '';

  const handleUbahPassword = async() => {
    if(document.querySelector("#baru").value !== '' &&
      document.querySelector("#verify").value !== '' &&
      document.querySelector("#now").value !== ''
    ){
      let result = await api.post('magang/ubahpassword',{
        "now" : document.querySelector("#now").value,
        "email" : authenticationService.currentUserValue.email,
        "new" : document.querySelector("#baru").value
      },{
        headers : {
          "token" : authenticationService.currentUserValue.token,
          "Content-Type" : "application/json"
        }
      });
      if(result.data.message === 'Berhasil'){
        alert('Berhasil Ubah Password');
      }else if(result.data.message === 'Password Sekarang Salah'){
        alert('Password saat ini yang diketikkan salah');
      }else{
        alert('Gagal Merubah Password');
      }
    }else{
      return alert('Harap Melengkapi Isian');
    }
  }

  const handleChange = (e) => {
    if(strengthIndicator(document.querySelector("#baru").value) >= 5 ){
      kekuatan_password = 'Kekuatan Password Baik';
      setDisable(false);
      setColor("green");
    }else if(strengthIndicator(document.querySelector("#baru").value) < 5 &&
      strengthIndicator(document.querySelector("#baru").value) >= 3)
    {
      kekuatan_password = 'Kekuatan Password Cukup';
      setDisable(false);
      setColor("orange");
    }else{
      kekuatan_password = 'Kekuatan Password Kurang';
      setDisable(true);
      setColor("red");
    }
    document.querySelector("#strength").innerHTML = kekuatan_password;

  }

  const handleChangeVerify = (e) => {
    if(document.querySelector("#verify").value !== document.querySelector("#baru").value){
      document.querySelector("#password_match").innerHTML = 'Password Tidak Sama';
      setDisable(true);
    }else{
      document.querySelector("#password_match").innerHTML = '';
      setDisable(false);
    }
  }
  return(
    <Wrapper>
      <Card>
        <CardContent>
          <div className={classes.root}>
          <Typography component="h5" variant = "h5">Ubah Password</Typography>
          <br></br>
          <Grid container spacing={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <Grid item xs>
               <TextField
                  label='Password Saat Ini'
                  variant="outlined"
                  style = {{
                    width : "100%"
                  }}
                  id = "now"
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
             </Grid>

             </MuiPickersUtilsProvider>
           </Grid>
           <Grid container spacing ={3}>
             <Grid item xs>
               <TextField
                  label='Password Baru'
                  variant="outlined"
                  id = "baru"
                  style = {{
                    width : "100%"
                  }}
                  onChange = {e => handleChange(e.target.value)}
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  id = "strength"
                  style = {{
                    color:color
                  }}
                  variant="subtitle1" display="block" gutterBottom>
                </Typography>
             </Grid>
             </Grid>
             <Grid container spacing={3}>
             <Grid item xs>
               <TextField
                  label='Password Baru Sekali Lagi'
                  variant="outlined"
                  style = {{
                    width : "100%"
                  }}
                  id = "verify"
                  onChange = {e => handleChangeVerify(e.target.value)}
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  InputProps={{ // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  id = "password_match"
                  style = {{
                    color:"red"
                  }}
                   variant="caption" display="block" gutterBottom>
                 </Typography>
                <Typography
                  id = "password_match"
                  style = {{
                    color:"red"
                  }}
                  variant="caption" display="block" gutterBottom>
                </Typography>

             </Grid>
           </Grid>
           <Grid container spacing={3}>
             <Grid item xs>
               <Button
                variant="contained"
                color="primary"
                id="btn_simpan"
                style = {{
                  width : "100%",
                  visibility : disable ? "hidden" : "visible"
                }}
                onClick = {handleUbahPassword}
                size="big"
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Simpan
              </Button>
              <br></br><br></br>
             </Grid>
           </Grid>
          </div>
      </CardContent>
      </Card>
    </Wrapper>
  );
};

export default UbahPassword;
