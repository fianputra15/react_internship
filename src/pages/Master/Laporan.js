import React,{useState, useEffect} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Api from '../../Api';
import Chip from '@material-ui/core/Chip';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/id';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinearScale from "@material-ui/icons/LinearScale";
import { withStyles,emphasize  } from '@material-ui/core/styles';
import { authenticationService } from '../../../src/_services/authentication.service';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import GetAppIcon from '@material-ui/icons/GetApp';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MaterialTable from 'material-table';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
      width : "100%",
  },
}));


const api = axios.create({
  baseURL: Api.url
});



function Laporan(){
  const classes = useStyles();
  const [state, setState] = useState();
  const [errorMessages,setErrorMessages] = useState([]);
  const [isError,setIserror] = useState(false);
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
  const fetchData = async() => {
      const result = await api.get('admin/laporan/',
      {
        headers : {
          'token' : authenticationService.currentUserValue.token,
          'Content-Type' : 'application/json'
        }
      })
      console.log(result.data);
      setState(result.data);
  }
  useEffect(()=>{
    fetchData();
  },[]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRowDelete = (oldData, resolve) => {
    api.delete('admin/laporan/hapus/'+oldData.id,{
      headers: {
        'token': localStorage.getItem('currentUser').token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const dataDelete = [...state];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setState([...dataDelete]);
        resolve()
        alert("Terhapus");
        fetchData();
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  const handleClose = () => {
    setOpen(false);
  };

  var columns = [
    {title : 'Nama',field : 'nama'},
    {title : 'Penempatan',field : 'penempatan'},
    {title: 'Tanggal', field: 'created_at',type:'date',
      render:rowData => <Typography component="p" variant="p">{moment(rowData.absen_pagi).format('dddd, Do MMMM YYYY')}</Typography>,
    },
    {title: 'Laporan', field: 'laporan',
      render: rowData =>
      rowData.laporan ?
        <Button  alt={`Belum Ada`}
        variant="contained"
        color="primary" startIcon={<GetAppIcon />}
        href={`${Api.url}/laporan/${rowData.laporan}`}
        color = "primary">{rowData.laporan}</Button>
      :<Typography component="p" variant="p">Belum Ada</Typography>,
    },
  ];

  return(
    <Wrapper>
      <Card>
        <CardContent>

          <div className={classes.root}>
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Laporan"
              icon={<LinearScale fontSize="small" />}
            />
          <Alert severity="warning">Menghapus Laporan akan sekalian menghapus data absensi mahasiswa magang tersebut berdasarkan tanggal</Alert>
          <br></br>
              <Modal
               aria-labelledby="transition-modal-title"
               aria-describedby="transition-modal-description"
               className={classes.modal}
               open={open}
               onClose={handleClose}
               closeAfterTransition
               BackdropComponent={Backdrop}
               BackdropProps={{
                 timeout: 500,
               }}
             >
               <Fade in={open}>
                 <div className={classes.paper}>
                   <h2 id="transition-modal-title">Transition modal</h2>
                   <p id="transition-modal-description">react-transition-group animates me.</p>
                   <iframe
                     style = {{
                       width:"100%"
                     }}

                     src="https://docs.google.com/gview?url=http://remote.url.tld/path/to/document.doc&embedded=true"></iframe>
                 </div>
               </Fade>

             </Modal>
              <MaterialTable

              title="Data Laporan Harian"
              columns={columns}
              options={{actionsColumnIndex : 8}}
              data={state}
              options={{
                filtering: true
              }}
              editable = {{
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      setState((prevState) => {
                        handleRowDelete(oldData, resolve)
                      });
                    }, 600);
                  }),
                }
              }
            />
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Laporan;
