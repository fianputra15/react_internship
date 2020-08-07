import { Bar, Bubble } from "react-chartjs-2";
import {
  NewsCard,
  PostCard,
  StatCard,
  WeatherCard,
  Wrapper
} from "../../components";
import WorkIcon from '@material-ui/icons/Work';
import React, { useState,useEffect } from "react";
import { mockDashboard, mockFeed } from "../../utils/mock";
import {authenticationService} from "../../_services/authentication.service";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import Api from "../../Api";
import axios from "axios";
import 'moment/locale/id';
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreIcon from "@material-ui/icons/More";
import GroupIcon from '@material-ui/icons/Group';
import BusinessIcon from '@material-ui/icons/Business';
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import SchoolIcon from '@material-ui/icons/School';
import SettingsIcon from "@material-ui/icons/Settings";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import {CardContent} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


let id = 0;
function createData(name, date, progress) {
  id += 1;
  return { id, name, date, progress };
}

const data = [
  createData("UI prototyping", "January 23", 67),
  createData("Design", "February 2", 87),
  createData("Development", "March 30", 54),
  createData("Testing and delivery", "April 12", 34),
  createData("Ongoing maintanance", "May 28", 56),
  createData("Extensive review", "December 3", 56),
  createData("Extensive testing", "December 25", 56)
];

const api = axios.create({
  baseURL : Api.url
})

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  modal: {
    // display: 'flex',
    alignItems: 'center',
    paddingTop : '20px',
    overflow:'scroll',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: '1px ' + theme.palette.blue,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state,setState] = useState([]);
  const [universitas,setUniversitas] = useState([]);
  const [belumabsen,setBelumabsen] = useState([]);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const classes = useStyles();
  const [isLoading,setIsLoading] = useState(true);
  const handleGetInfo = async () => {
    const result = await api.get('admin/magang',{
      headers : {
        "token" : authenticationService.currentUserValue.token,
        "Content-Type" : "application/json"
      }
    });
    setState(result.data);
    console.log("ini datanya " + result.data);
  }

  const handleGetBelumAbsen = async() => {
    const result = await api.get('admin/belumabsen',{
      headers : {
        "token" : authenticationService.currentUserValue.token,
        "Content-Type" : "application/json"
      }
    });
    setBelumabsen(result.data);
  }

  const handleGetUniversitas = async () => {
    const result = await api.get('admin/universitas',{
      headers : {
        "token" : authenticationService.currentUserValue.token,
        "Content-Type" : "application/json"
      }
    });
    setUniversitas(result.data);
  }

  var columns = [
    {title : 'Nama',field : 'nama'},
    {title : 'Penempatan',field : 'penempatan'},
    {title : 'Foto',field : 'foto',
      render: rowData => <Avatar alt={`${rowData.nama}`} src={`${Api.url}/foto/${rowData.foto}`} className={classes.large} />,
    },

  ];



  useEffect(() => {
    handleGetUniversitas();
    handleGetInfo();
    handleGetBelumAbsen();
    if(state != undefined && universitas != undefined){
      setIsLoading(false)
    }
  },[])

  const chartMenu = (
    <Menu
      id="chart-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <MoreIcon />
        </ListItemIcon>
        <ListItemText primary="View more" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <NotificationsOffIcon />
        </ListItemIcon>
        <ListItemText primary="Disable notifications" />
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Remove panel" />
      </MenuItem>
    </Menu>
  );

  return (
    <Wrapper>
      {isLoading ? <LinearProgress style = {{
        marginBottom : "8px"
      }} /> : ''}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            type="fill"
            title="Mahasiswa Magang"
            value={isLoading ? 0 : state.length }
            icon={<GroupIcon />}
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            type="fill"
            title="Universitas"
            value={isLoading ? 0 : universitas.length }
            icon={<SchoolIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <StatCard
              type="fill"
              title="Jumlah Penempatan"
              value={isLoading ? 0 : universitas.length }
              icon={<BusinessIcon />}
              color="#cddc39"
          />
        </Grid>
      </Grid>
      <br></br>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" >{moment(new Date()).format('LLLL')}</Typography>
        </CardContent>
      </Card>
      <br></br>
      <MaterialTable
          title='Mahasiswa Yang Belum Absen'
          columns={columns}
          data={belumabsen}
          options={{
            actionsColumnIndex : 8,
            // filtering: true
          }}
      />
    </Wrapper>
  );
};

export default Home;
