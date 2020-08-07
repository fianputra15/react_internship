import React,{useState} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Api from '../../Api';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
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

const Pengaturan = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
  const getPengaturan = async() => {
    let pengaturan = await api.get('admin/pengaturan',{
      headers : {
        "token" : localStorage.getItem('currentUser').token,
        "Content-Type" : "application/json"
      }
    }).then((value) => {
      let mulai = new Date(Date.parse(value.data[0].start_date));
      let berakhir = new Date(Date.parse(value.data[0].end_date));
      document.querySelector("#wfh").innerHTML = `
        ${value.data[0].deskripsi} berlaku mulai pada <b>${mulai}</b>
      sampai dengan <b>${berakhir}</b>`;
    })
  }
  const handleClick = async() => {
    let mulai = await document.querySelector("#mulai").value;
    let setelah = await document.querySelector("#setelah").value;
    let deskripsi = await document.querySelector("#deskripsi").value;
    api.post('admin/pengaturan/tambah',{
      mulai : mulai,
      setelah : setelah,
      deskripsi : deskripsi
    },{
      headers: {
        'token': localStorage.getItem('currentUser').token,
        'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      alert("Berhasil");
      getPengaturan();
    }).catch((err) => {
      alert("Gagal");
    })
  }
  getPengaturan();
  return(
    <Wrapper>
      <Card>
        <CardContent>
          <div className={classes.root}>
          <Typography component="h5" variant = "h5">Pengaturan WFH</Typography>
          <br></br>
          <Grid container spacing={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <Grid item xs>
               <TextField
                  id="mulai"
                  label="Tanggal Mulai"
                  type="date"
                  style = {{
                    width : "100%"
                  }}
                  defaultValue="2020-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             </Grid>
             <Grid item xs>
               <TextField
                  id="setelah"
                  style = {{
                    width : "100%"
                  }}
                  label="Tanggal Berakhir"
                  type="date"
                  defaultValue="2020-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
             </Grid>
             </MuiPickersUtilsProvider>
           </Grid>

           <Grid container spacing={3}>
             <Grid item xs>
               <Typography
                 style = {{
                   marginBottom : "2px"
                 }}
                 >
                 <label>Deskripsi</label>
               </Typography>
               <TextareaAutosize
                  rowsMax={4}
                  style = {{
                    width : "100%"
                  }}
                  label="Standard"
                  placeholder="Deskripsi"
                  id = "deskripsi"
                  defaultValue="Ketikkan Deskripsi.."
                />
             </Grid>
           </Grid>
           <Grid container spacing={3}>
             <Grid item xs>
               <Button
                variant="contained"
                color="primary"
                style = {{
                  width : "100%"
                }}
                size="big"
                onClick = {handleClick}
                className={classes.button}
                startIcon={<SaveIcon />}
              >
                Simpan
              </Button>
              <br></br><br></br>
              <Typography id = "wfh">WFH Sekarang</Typography>
             </Grid>
           </Grid>
          </div>
      </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Pengaturan;
