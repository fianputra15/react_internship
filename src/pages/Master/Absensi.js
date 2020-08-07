import React,{useState, useEffect} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import Card from '@material-ui/core/Card';
import Api from '../../Api';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/id';
import Alert from '@material-ui/lab/Alert';
import LinearScale from "@material-ui/icons/LinearScale";
import { withStyles,emphasize  } from '@material-ui/core/styles';
import { authenticationService } from '../../../src/_services/authentication.service';
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import MaterialTable from 'material-table';
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



function Absensi(){
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

  const handleClose = () => {
    setOpen(false);
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

  var columns = [
    {title : 'Nama',field : 'nama'},
    {title : 'Penempatan',field : 'penempatan'},
    {title : 'Absen Pagi',field : 'absen_pagi',type:'date',
      render:rowData => <Typography component="p" variant="p">{moment(rowData.absen_pagi).format('LLLL')}</Typography>
    },
    {title: 'Absen Pulang', field: 'absen_pulang',type:'date',
      render:rowData => <Typography component="p" variant="p">{moment(rowData.absen_pulang).format('LLLL')}</Typography>
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
          <Alert severity="warning">Menghapus Absensi akan sekalian menghapus laporan harian mahasiswa magang</Alert>
              <br></br>
              <MaterialTable

              title="Data Absensi"
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

export default Absensi;
