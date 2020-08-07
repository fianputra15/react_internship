import React ,{ useRef, useState , useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles,emphasize  } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import SendIcon from "@material-ui/icons/Send";
import LinearScale from "@material-ui/icons/LinearScale";
import { Wrapper } from '../../components';
import ReactQuill from 'react-quill';
import axios from 'axios';
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import CardHeader from '@material-ui/core/CardHeader';
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { drawerWidth } from "../../styleVariables";
import { makeStyles } from "@material-ui/core/styles";
import Alert from '@material-ui/lab/Alert';
import Badge from '@material-ui/core/Badge';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 1,
    overflow: "hidden",
    position: "relative"
  },
  header: {
    marginTop: "-72px",
    padding: "8px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "relative",
    boxShadow: "0 1px 8px rgba(0,0,0,.3)"
  },
  toolBar: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(1) / 2,
      paddingRight: theme.spacing(1) / 2
    }
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
    maxWidth: drawerWidth,
    overflow: "auto",
    height: "100%"
  },
  modal: {
    [theme.breakpoints.down("sm")]: {
      top: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      top: "64px"
    },
    zIndex: "1000"
  },
  backdrop: {
    [theme.breakpoints.down("sm")]: {
      top: "56px"
    },
    [theme.breakpoints.up("sm")]: {
      top: "64px"
    }
  },
  headerLeft: {
    position: "relative",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      maxWidth: drawerWidth
    },
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth / 2,
      maxWidth: drawerWidth / 2
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "-40px"
    },
    display: "flex",
    alignItems: "center",
    overflow: "auto",
    height: "100%"
  },
  wrapper: {
    width: "100%",
    height: "calc(100vh - 208px)",
    zIndex: 1,
    display: "flex",
    position: "relative",
    overflow: "hidden",
    maxWidth: "100%",
    flexDirection: "row"
  },
  main: {
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 240px)"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
    minWidth: 0,
    height: "calc(100% - 75px)",
    boxSizing: "border-box",
    flex: 1,
    position: "relative",
    overflowX: "hidden",
    overflowY: "auto"
  },
  conversation: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: theme.spacing(1) * 2,
    [theme.breakpoints.down("sm")]: {
      padding: `0 ${theme.spacing(1) * 1}px`
    },
    [theme.breakpoints.up("sm")]: {
      padding: `0 ${theme.spacing(1) * 3}px`
    },
    display: "flex"
  },
  conversationSent: {
    justifyContent: "flex-end"
  },
  body: {
    position: "relative",
    padding: ".625rem 1rem",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    color: "white"
  },
  bodyReceived: {
    "&::after": {
      position: "absolute",
      top: 0,
      width: 0,
      height: 0,
      content: '""',
      border: `5px solid ${theme.palette.primary.main}`,
      borderBottomColor: "transparent",
      left: "-7px",
      borderLeftColor: "transparent"
    }
  },
  bodySent: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    float: "right",
    order: 1,
    "&::after": {
      position: "absolute",
      bottom: 0,
      width: 0,
      height: 0,
      content: '""',
      border: `5px solid ${theme.palette.secondary.main}`,
      borderTopColor: "transparent",
      borderRightColor: "transparent",
      right: "-7px"
    }
  },
  date: {
    display: "block",
    fontSize: "11px",
    paddingTop: "2px",
    fontStyle: "italic",
    fontWeight: "600",
    color: theme.palette.primary.contrastText
  },
  dateSent: {
    textAlign: "right"
  },
  input: {
    width : "100%",
    boxSizing: "border-box"
  },
  text: {
    color : theme.palette.primary.main
  }
}));

function Preprocessing(){
  const classes = useStyles();
  const [values, setValues] = React.useState({
    kalimat: '',
  });
  const [data,setData] = useState([]);
  var dataAdd = {};
  const handleChangeForm = kalimat => event => {
    setValues({ ...values, [kalimat]: event.target.value });
  };
  const StyledBreadcrumb = withStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.secondary.primary,
      height: theme.spacing(3),
      color: theme.palette.grey[800],
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey[300],
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(theme.palette.grey[300], 0.12),
      },
    },
  }))(Chip)
  const handleInputKalimat = (kalimat) => {
    dataAdd['kalimat'] = kalimat;
    console.log(dataAdd);
    api.post("preprocessing",dataAdd).
        then(res => {
          const result = res;
          setData(result.data);
        })
        .catch(error => {
        })
  }
  return(
    <Wrapper>
      <Card>
        <CardContent className="overflow-visible">
          <TextField
            label="Masukkan Kalimat"
            type="text"
            margin="normal"
            onChange={handleChangeForm('kalimat')}
            className={classes.input}
          />
        <br></br>
          <Button variant="contained" color="primary" onClick={() => { handleInputKalimat(values.kalimat) }}>Proses</Button>
        </CardContent>
      </Card>
      <br></br>
      <Card>
        <CardContent className="overflow-visible">
        <Typography gutterBottom variant="h4" component="h4">
            Result  </Typography>
        <Breadcrumbs aria-label="breadcrumb">
          <StyledBreadcrumb
            component="a"
            href="#"
            label="Case Folding"
            icon={<LinearScale fontSize="small" />}
          />
        </Breadcrumbs>
          <Typography gutterBottom variant="h5" component="h2">
          {data.lower_case}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Tokenizing"
              icon={<LinearScale fontSize="small" />}
            />
          </Breadcrumbs>
          <Typography gutterBottom variant="h5" component="h2">
          {data.tokenizing}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Stopword"
              icon={<LinearScale fontSize="small" />}
            />
          </Breadcrumbs>
          <Typography gutterBottom variant="h5" component="h2">
          {data.stop_word}
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Stemming"
              icon={<LinearScale fontSize="small" />}
            />
          </Breadcrumbs>
          <Typography gutterBottom variant="h5" component="h1">
          {data.stemming}
          </Typography>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
export default Preprocessing;
