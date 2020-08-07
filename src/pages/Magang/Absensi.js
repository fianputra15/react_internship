import React,{useState,useEffect} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import moment from "moment";
import 'moment/locale/id';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { authenticationService } from '../../../src/_services/authentication.service';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Api from '../../Api';
import { withStyles,emphasize  } from '@material-ui/core/styles';
import axios from 'axios';
import LinearScale from "@material-ui/icons/LinearScale";
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Badge from '@material-ui/core/Badge';
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
// Fungsi Aksi untuk Absen Pagi
const handleAbsenPagi = async () => {
  api.post("/magang/absenpagi",{
    email : authenticationService.currentUserValue.email,
    absenpagi : moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  },{
    headers : {
      "token" : authenticationService.currentUserValue.token,
      "Content-Type" : "application/json"
    }
  }).then(result => {
    if(result.data.message === 'sudah'){
      alert('Anda Telah Absen Sebelumnya');
    }else{
      alert('Berhasil Absen Pagi');
    }
  }).catch((err) => {
    alert("Gagal");
  });
}

// Fungsi Aksi untuk Absen Pulang
const handleAbsenPulang = async() => {
  const data = new FormData();
  if(document.querySelector("#laporan").files[0]){
    data.append('email',authenticationService.currentUserValue.email);
    data.append('laporan',document.querySelector("#laporan").files[0]);
    data.append('tanggal',moment(new Date()).format("YYYY-MM-DD"));
    data.append('pulang',moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
    api.patch("/magang/absenpulang",data,
    {
      headers : {
        "token" : authenticationService.currentUserValue.token,
        "Content-Type" : "application/json"
      }
    }
    ).then(result => {
      if(result){
        alert("Berhasil Absen Pulang");
      }else{
        alert("Gagal Absen Pulang");
      }
    }).catch((err) => {
      alert("Gagal");
    })
  }else{
    alert('Silahkan Upload File Laporan Harian Terlebih Dahulu');
  }

}

const AbsensiMagang = () => {
  const classes = useStyles();
  const [startWFH,setStartWFH] = useState();
  const [state,setState] = useState();
  const [endWFH,setEndWFH] = useState();
  const [isLoading,setIsLoading] = useState(true);
  moment.locale('id');
  let formatdate = 'hh-mm-yyyy';
  let date = moment(moment().format('LTS'),formatdate);
  let start_wfh,end_wfh;
  let format = 'hh:mm:ss';
  let time = moment(moment().format('LTS'),format);
  // Inisialisasi Waktu Absen
  let waktu = '';
  let beforeTime,afterTime;
  let buttonabsen,buttonuploadlaporan;
  //Memberikan StyledBreadcrumb
  const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.blue,
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      marginBottom:"8px",
      '&:hover, &:focus': {
        backgroundColor: theme.palette.blue,
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.blue
      },
    },
  }))(Chip);
  // Fungsi Menampilkan Info WFH
  const getInfo = async () => {
    let infoWFH = await api.get('admin/pengaturan',{
        headers : {
          "token" : localStorage.getItem('currentUser').token,
          "Content-Type" : "application/json"
        }
      }).then(value => {
        if(value){
          setStartWFH(value.data[0].start_date);
          setEndWFH(value.data[0].end_date);
          document.querySelector("#wfh").innerHTML = `
            ${value.data[0].deskripsi} berlaku mulai pada &nbsp; <b>${moment(value.data[0].start_date).format('ll')}</b>
          &nbsp; sampai dengan &nbsp;<b>${moment(value.data[0].end_date).format('ll')}</b>`;
        }
      });
  }
  // Fungsi Untuk mengambil info mahasiswa Magang
  const fetchUser = async() => {
      const result = await api.get('magang/magang_info/'+authenticationService.currentUserValue.email,
      {
        headers : {
          'token' : authenticationService.currentUserValue.token,
          'Content-Type' : 'application/json'
        }
      })
      setState(result.data);
      setIsLoading(false);
  }
  useEffect(() => {
    fetchUser();
    getInfo();
  },[])
  beforeTime = moment('17:00:00', format);
  afterTime = moment('23:59:00', format);
  // Mengecek Apakah WFH Telah Berakhir Atau Belum
  if(date.isBetween(startWFH,endWFH)){
    if (time.isBetween(beforeTime, afterTime)) {
      // Untuk Memuncul Button Absen Pulang
      buttonuploadlaporan =
          <Button
            variant="outlined"
            component="label"
            color="secondary"
            startIcon={<PublishIcon />}
            style = {{
              width:"100%",
              marginBottom:"8px"
            }}
          >
            Upload File Laporan Harian
            <input
              type="file"
              id = "laporan"
              style={{ display: "none" }}
            />
        </Button>;
      buttonabsen =
        <Button
         variant="contained"
         color="primary"
         size="small"
         style = {{
           width:"100%",
           marginBottom:"8px"
         }}
         onClick = {handleAbsenPulang}
         className={classes.button}
         startIcon={<SaveIcon />}
         >
         Absen Pulang
       </Button>;
      waktu = 'Selamat Sore';
    } else {
      // Untuk Memuncul Button Absen Pagi
      waktu = 'Selamat Pagi';
      buttonabsen =
        <Button
         variant="contained"
         color="primary"
         size="small"
         onClick = {handleAbsenPagi}
         className={classes.button}
         startIcon={<SaveIcon />}
         >
         Absen Pagi
     </Button>;
    }
  }else{
    waktu = "WFH TELAH BERAKHIR";
  }

  return(
    <Wrapper>
      <Card>
        <CardContent>
          <div className={classes.root}>
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Absensi"
              icon={<LinearScale fontSize="small" />}
            />
          <Alert severity="info" id = "wfh"></Alert>
            <br></br><br></br>
          <Typography variant = "h6" component = "h6">
            {
              waktu
            } {isLoading ? '' : state[0].nama} - <b>{moment().format('LLLL')}</b></Typography>
          {buttonuploadlaporan}
          {buttonabsen}
          </div>
      </CardContent>
      </Card>
    </Wrapper>
  );
};

export default AbsensiMagang;
