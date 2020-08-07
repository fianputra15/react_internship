import React,{useState, useEffect} from 'react';
import 'date-fns';
import { Wrapper } from '../../components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Api from '../../Api';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import moment from "moment";
import 'moment/locale/id';
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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const api = axios.create({
  baseURL: Api.url
});


var columns = [
  { title: 'Absen Pagi', field: 'absen_pagi',
    render:rowData => <Typography component="p" variant="p">{moment(rowData.absen_pagi).format('LLLL')}</Typography>
   },
  { title: 'Absen Pulang', field: 'absen_pulang',
    render: rowData => !rowData.absen_pulang ?
    <Typography component="p" variant="p">Belum Absen</Typography> :
    <Typography component="p" variant="p">{moment(rowData.absen_pulang).format('LLLL')}</Typography>,
  },
  { title: 'Laporan', field: 'laporan',
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
function History(){
  const classes = useStyles();
  const [state, setState] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date('2020-08-18T21:11:54'));
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
      const result = await api.get('magang/history/'+authenticationService.currentUserValue.email,
      {
        headers : {
          'token' : authenticationService.currentUserValue.token,
          'Content-Type' : 'application/json'
        }
      })
      setState(result.data);
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return(
    <Wrapper>
      <Card>
        <CardContent>
          <div className={classes.root}>
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Riwayat"
              icon={<LinearScale fontSize="small" />}
            />
              <MaterialTable
              title="Riwayat Absensi"
              columns={columns}
              options={{actionsColumnIndex : 8}}
              data={state}
            />
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default History;
