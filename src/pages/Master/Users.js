import React, {useRef, useState, useEffect} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from '@material-ui/core/Paper';
import {Wrapper} from '../../components';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const api = axios.create({baseURL: 'http://localhost:8000'});

function Users() {
  const [state, setState] = useState([]);
  const [roles, setRoles] = useState([]);
  const [frekuensi, setFrekuensi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const refreshTable = () => {
    const fetchData = async () => {
      const result = await api.get('admin/users', {
        headers: {
          'token': localStorage.getItem('currentUser').token,
          'Content-Type': 'application/json'
        }
      })
      setState(result.data);
      const roleuser = await api.get('admin/roles', {
        headers: {
          'token': localStorage.getItem('currentUser').token,
          'Content-Type': 'application/json'
        }
      })
      setRoles(roleuser.data);
    };
    fetchData();
  }
  useEffect(() => {
    refreshTable();
    if(roles != undefined && frekuensi != undefined && state != undefined){
      setIsLoading(false);
    }
  }, []);

  //Operation Add

  const handleRowAdd = (newData, resolve) => {
    let errorList = [];
    if (newData.email === undefined) {
      errorList.push("Harap Isi Email");
    }
    if (newData.roles === undefined) {
      errorList.push("Harap Memilih Role User");
    }
    if (errorList.length < 1) {
      api.post("admin/users/tambah", newData, {
        headers: {
          'token': localStorage.getItem('currentUser').token,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let dataToAdd = state;
        dataToAdd.push(newData);
        setState(dataToAdd);
        resolve()
        setErrorMessages([])
        setIserror(false)
        refreshTable();
      }).catch(error => {
        setErrorMessages(["Cannot add data. Server error!"])
        setIserror(true)
        resolve()
      })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }
  }

  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if (newData.email === undefined) {
      errorList.push("Harap Isi Email");
    }
    if (newData.roles === undefined) {
      errorList.push("Harap Pilih Role User");
    }
    if (errorList.length < 1) {
      api.patch("/admin/users/update",newData,{
        headers: {
          'token': localStorage.getItem('currentUser').token,
          'Content-Type': 'application/json'
        }}
      )
      .then(res => {
        const dataUpdate = [...state];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setState([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
        refreshTable();
      }).catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
      })
    } else {
      setErrorMessages(errorList)
      setIserror(true)
      resolve()
    }

  }
  const handleRowDelete = (oldData, resolve) => {
    api.delete('admin/users/hapus/'+oldData.email,{
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

  let objRoles = roles.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.roles;
    return acc;
  }, {});
  var columns = [
    {
      title: 'Email',
      field: 'email'
    }, {
      title: 'Role User',
      field: 'roles',
      lookup: objRoles
    }
  ];

  return (
    <Wrapper>

    <Card>
      {isLoading ? <LinearProgress style = {{
        marginBottom : "8px"
      }} /> : ''}
      <CardContent>
        <h3>Data Users</h3>
        <div>
          {
            iserror && <Alert severity="error">
                {
                  errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>
                  })
                }
              </Alert>
          }
        </div>
        <MaterialTable title="Tabel Users" columns={columns} data={state} editable={{
            onRowAdd: (newData) => new Promise((resolve) => {

              setTimeout(() => {
                handleRowAdd(newData, resolve)

              }, 600);
            }),
            onRowUpdate: (newData, oldData) => new Promise((resolve) => {
              setTimeout(() => {
                handleRowUpdate(newData, oldData, resolve)
                resolve();
                // if (oldData) {
                //   setState((prevState) => {
                //     const data = [...prevState.data];
                //     data[data.indexOf(oldData)] = newData;
                //     return { ...prevState, data };
                //   });
                // }
              }, 600);
            }),
            onRowDelete: (oldData) => new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                setState((prevState) => {
                  handleRowDelete(oldData, resolve)
                });
              }, 600);
            })
          }}/>
      </CardContent>
    </Card>
  </Wrapper>);
}

export default Users;
