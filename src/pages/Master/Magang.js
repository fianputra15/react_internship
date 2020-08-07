import React ,{ useRef, useState , useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles,emphasize  } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import {authenticationService} from "../../_services/authentication.service";
import { Wrapper } from '../../components';
import { IconButton } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinearScale from "@material-ui/icons/LinearScale";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Api from '../../Api';
import Typography from '@material-ui/core/Typography';
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from '@material-ui/lab/Alert';
import { Overlay } from 'react-portal-overlay';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import {authHeader}  from '../../_helpers/auth-header';

const api = axios.create({
  baseURL: Api.url
});

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.blue,
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.blue,
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.blue
    },
    // '&:active': {
    //   boxShadow: theme.shadows[1],
    //   backgroundColor: emphasize(theme.palette.blue[300], 0.12),
    // },
  },
}))(Chip)


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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

function Magang(){
  const [state, setState] = useState([]);
  const [iserror, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [foto,setFoto] = useState();

  const refreshTable = () => {
    const fetchData = async () => {
      const result = await api.get('admin/magang',{
        headers: {
          'token': localStorage.getItem('currentUser').token,
          'Content-Type': 'application/json'
        }
      })
      setState(result.data);
    };
    fetchData();
  }
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  useEffect(() => {
    refreshTable();
    if(state != undefined){
      setIsLoading(false);
    }
  }, []);


  //Operation Add

  const handleRowAdd = (newData,resolve) => {
    let errorList = []
    if(newData.nama === undefined){
      errorList.push("Harap Isi Nama");
    }
    if(newData.jk === undefined){
      errorList.push("Harap Pilih Jenis Kelamin");
    }
    if(newData.alamat === undefined){
      errorList.push("Harap Isi Alamat");
    }
    if(newData.penempatan === undefined){
      errorList.push("Harap Pilih Penempatan");
    }
    if(newData.universitas === undefined){
      errorList.push("Harap Isi Universitas");
    }
    if(newData.email === undefined){
      errorList.push("Harap Isi Email");
    }
    const data = new FormData();
    data.append('email', newData.email);
    data.append('nama', newData.nama);
    data.append('alamat', newData.alamat);
    data.append('penempatan', newData.penempatan);
    data.append('universitas', newData.universitas);
    data.append('jk', newData.jk);
    data.append('foto', newData.foto);

    if(errorList.length < 1){
        api.post("admin/magang/tambah",data,{
          headers: {
            'token': localStorage.getItem('currentUser').token,
            'Content-Type': 'application/json'
          }
        }).
        then(res => {
          if(res.data.message === 'Sudah'){
            alert('Email Telah Digunakan');
            refreshTable();
          }else{
            let dataToAdd = state;
            dataToAdd.push(newData);
            setState(dataToAdd);
            resolve()
            setErrorMessages([])
            setIserror(false)
            alert("Berhasil Menambahkan");
            refreshTable();
          }

        })
        .catch(error => {
          setErrorMessages(["Cannot add data. Server error!"])
          setIserror(true)
          resolve()
        })
      }else{
        setErrorMessages(errorList)
        setIserror(true)
        resolve()
      }
    }

  const handleRowUpdate = (newData, oldData, resolve) => {
      let errorList = []
      if(newData.nama === undefined){
        errorList.push("Harap Isi Nama");
      }
      if(newData.jk === undefined){
        errorList.push("Harap Pilih Jenis Kelamin");
      }
      if(newData.alamat === undefined){
        errorList.push("Harap Isi Alamat");
      }
      if(newData.penempatan === undefined){
        errorList.push("Harap Pilih Penempatan");
      }
      if(newData.universitas === undefined){
        errorList.push("Harap Isi Universitas");
      }
      if(newData.email === undefined){
        errorList.push("Harap Isi Email");
      }

      const data = new FormData();

      data.append('email', newData.email);
      data.append('oldEmail',oldData.email);
      data.append('nama', newData.nama);
      data.append('alamat', newData.alamat);
      data.append('penempatan', newData.penempatan);
      data.append('universitas', newData.universitas);
      data.append('oldphoto',oldData.foto);
      data.append('jk', newData.jk);
      data.append('oldId',oldData.id);
      if(newData.foto != undefined){
        data.append('foto', newData.foto);
      }
      if(errorList.length < 1){
        api.patch("/admin/magang/update",data,{
          headers: {
            'token': localStorage.getItem('currentUser').token,
            'Content-Type': 'application/json'
          }}
        )
        .then(res => {
          const dataUpdate = [...state];
          const index = oldData.tableData.id;
          dataUpdate[index] = data;
          setState([...dataUpdate]);
          resolve()
          setIserror(false)
          setErrorMessages([])
          alert('Berhasil Terupdate')
          refreshTable();
        })
        .catch(error => {
          setErrorMessages(["Update failed! Server error"])
          setIserror(true)
          resolve()
        })
      }else{
        setErrorMessages(errorList)
        setIserror(true)
        resolve()
      }

  }

  const handleResetPassword = (rowData) => {
    api.post('admin/magang/reset',{
      email : rowData.email
    },{
      headers : {
        "token" : authenticationService.currentUserValue.token,
        "Content-Type" : "application/json"
      }
    }).then(result => {
      if(result){
        alert('Berhasil Reset Password');
      }else{
        alert('Gagal Reset Password');
      }
    })
  }

  const handleRowDelete = (oldData, resolve) => {
    api.delete('admin/magang/hapus/'+oldData.email,{
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
        refreshTable();
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }
  var columns = [
    { title: 'Nama', field: 'nama' },
    { title: 'Email', field: 'email' },
    { title: 'Jenis Kelamin', field: 'jk',
      lookup : {
        'laki-laki'  :  'laki-laki',
         perempuan   :  'perempuan'
      },
      type : 'text'
    },
    { title: 'Alamat', field: 'alamat' },
    { title :'Asal Universitas' , field : 'universitas'},
    { title: 'Penempatan', field: 'penempatan', type: 'text' },
    { title: 'Foto', field: 'foto',
      editComponent: props => (
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          onChange = {e => props.onChange(e.target.files[0])}
          name = "foto"
          type="file"
        />
      ),
      render: rowData => <Avatar alt={`${rowData.nama}`} src={`${Api.url}/foto/${rowData.foto}`} className={classes.large} />,
    },
  ];

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //     <h5 id="simple-modal-title" style = {{
  //       color : "Blue",
  //       textAlign : "center"
  //     }}>
  //       <Typography variant = "h5" component = "h5">Tambah Data Mahasiswa Magang</Typography>
  //     </h5>
  //     {/* <p id="simple-modal-description">
  //       Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //     </p> */}
  //     <div>
  //       <form action="" method="post" enctype="multipart/form-data">
  //       <div>
  //         <TextField style = {{
  //           width : "100%"
  //         }} id="standard-basic" type="email" label="Email" onChange = {e => setUsername(e.target.value)}  name="email" />
  //       </div><br></br>
  //       <div>
  //         <TextField style = {{
  //           width : "100%"
  //         }} id="standard-basic" label="Nama Lengkap" onChange = {e => setNama(e.target.value)}  name="nama" />
  //       </div><br></br>
  //       <div>
  //       <RadioGroup aria-label="gender" name="gender"  onChange = {e => setGender(e.target.value)}>
  //         <FormLabel component="legend">Jenis Kelamin</FormLabel>
  //         <FormControlLabel value="laki-laki" control={<Radio />} label="Laki-Laki" />
  //         <FormControlLabel value="perempuan" control={<Radio />} label="Perempuan" />
  //       </RadioGroup>
  //       </div><br></br>
  //       <div>
  //         <TextField
  //         style = {{
  //           width : "100%"
  //         }}
  //         onChange = {e => setAlamat(e.target.value)}
  //         id="standard-basic" label="Alamat" name="alamat" />
  //       </div><br></br>
  //       <div>
  //         <TextField
  //         style = {{
  //           width : "100%"
  //         }}
  //         onChange = {e => setPenempatan(e.target.value)}
  //         id="standard-basic" name = "penempatan" label="Penempatan" />
  //       </div><br></br>
  //       <div>
  //         <TextField
  //         style = {{
  //           width : "100%"
  //         }}
  //         onChange = {e => setUniversitas(e.target.value)}
  //         id="standard-basic" label="Universitas" name="universitas" />
  //       </div><br></br>
  //       <FormLabel component="legend">Foto</FormLabel>
  //       <input
  //         accept="image/*"
  //         className={classes.input}
  //         id="contained-button-file"
  //         // multiple
  //         onChange = {e => setFoto(e.target.files[0])}
  //         name = "foto"
  //         type="file"
  //       /><br></br><br></br>
  //       <Button style = {{
  //         width : "100%"
  //       }} onClick = {handleRowAdd} variant = "contained" color = "primary">Tambah</Button>
  //       </form>
  //     </div>
  //   </div>
  // );

  return(
    <Wrapper>
      <Card>
        {isLoading ? <LinearProgress style = {{
          marginBottom : "8px"
        }} /> : ''}
          <CardContent>
              <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Data Mahasiswa Magang"
                icon={<LinearScale fontSize="small" />}
              />
              </Breadcrumbs>
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
              {/* <Button onClick = {handleOpen} variant = "contained" color = "primary">Tambah</Button><br></br><br></br>
              <Modal
                open={open}
                className = {classes.modal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
              {body}
              </Modal> */}
              <MaterialTable
              title="Tabel Mahasiswa Magang"
              columns={columns}
              options={{actionsColumnIndex : 2}}
              data={state}
              actions={[
                {
                  icon: 'undo',
                  tooltip: 'Reset Password',
                  onClick: (event, rowData) => {
                    handleResetPassword(rowData);
                  }
                },
              ]}
              options={{
                exportButton: true
              }}
              editable = {{
                onRowAdd: (newData) =>
                new Promise((resolve) => {

                  setTimeout(() => {
                    handleRowAdd(newData, resolve)

                  }, 600);
                }),
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      setState((prevState) => {
                        handleRowDelete(oldData, resolve)
                      });
                    }, 600);
                  }),
                  onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      handleRowUpdate(newData, oldData, resolve)
                      resolve();
                    }, 600);
                  }),
                }
              }
            />
        </CardContent>
      </Card>
    </Wrapper>
  );
}

export default Magang;
