import React ,{ useRef, useState , useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles  } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import { Wrapper } from '../../components';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});


function Nilai(){
  const [state, setState] = useState([]);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [frekuensi, setFrekuensi] = useState([]);
  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const refreshTable = () => {
    const fetchData = async () => {
      const nilai = await api.get('nilai_all')
      setState(nilai.data);
      const frekuensi = await api.get('freq_all')
      setFrekuensi(frekuensi.data);
      const mahasiswa = await api.get('mahasiswa_all')
      setMahasiswa(mahasiswa.data);
    };
    fetchData();
  }
  useEffect(() => {
    refreshTable();
  }, []);

 
  //Operation Add

  const handleRowAdd = (newData,resolve) => {
    var mahasiswa_new = {};
    let errorList = [];
    if(newData.nilai === undefined){
      errorList.push("Harap Isi Nilai");
    }else{
      mahasiswa_new['nilai'] = newData.nilai;
    } 
    if(newData.id_mahasiswa === undefined){
      errorList.push("Harap Pilih Mahasiswa");
    }else{
      mahasiswa_new['id_mahasiswa'] = newData.id_mahasiswa.id;
    }
    if(newData.id_freq === undefined){
      errorList.push("Harap Pilih Frekuensi");
    }else{
      mahasiswa_new['id_freq'] = newData.id_freq.id;
    }
    console.log(mahasiswa_new);
    if(errorList.length < 1){
        api.post("nilai_add",mahasiswa_new).
        then(res => {
          let dataToAdd = state;
          dataToAdd.push(newData);
          setState(dataToAdd);
          resolve()
          setErrorMessages([])
          setIserror(false)
          refreshTable();
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
      var mahasiswa_new = {};
      let errorList = [];
      if(newData.nilai === undefined){
        errorList.push("Harap Isi Nilai");
      }else{
        mahasiswa_new['nilai'] = newData.nilai;
      } 
      if(newData.id_mahasiswa === undefined){
        errorList.push("Harap Pilih Mahasiswa");
      }else{
        mahasiswa_new['id_mahasiswa'] = newData.id_mahasiswa.id;
      }
      if(newData.id_freq === undefined){
        errorList.push("Harap Pilih Frekuensi");
      }else{
        mahasiswa_new['id_freq'] = newData.id_freq.id;
      }
      console.log(mahasiswa_new);
        if(errorList.length < 1){
          api.patch("/nilai_operation/"+newData.id, mahasiswa_new)
          .then(res => {
            const dataUpdate = [...state];
            const index = oldData.tableData.id;
            dataUpdate[index] = newData;
            setState([...dataUpdate]);
            resolve()
            setIserror(false)
            setErrorMessages([])
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
  const handleRowDelete = (oldData, resolve) => {
    api.delete('nilai_operation/'+oldData.id)
    .then(res => {
      const dataDelete = [...state];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setState([...dataDelete]);
        resolve()
        refreshTable();
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  var objMahasiswa = mahasiswa.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.nama;
    return acc;
  }, {});

  var objFrekuensi = frekuensi.reduce(function(acc, cur, i) {
    acc[cur.id] = cur.frekuensi;
    return acc;
  }, {});

  var columns = [
    { 
      title: 'Nama', 
      field: 'id_mahasiswa.id',
      lookup : objMahasiswa
    },
    { 
      title: 'Frekuensi', 
      field: 'id_freq.id',
      lookup : objFrekuensi
    },
    { title: 'Nilai', field: 'nilai', type: 'text' },
    // {
    //   title: 'Birth Place',
    //   field: 'birthCity',
    //   lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    // },
  ];

  return(
    <Wrapper>
      <Card>
          <CardContent>
              <h3>Data Mahasiswa</h3>
              <div>
                {iserror && 
                  <Alert severity="error">
                      {errorMessages.map((msg, i) => {
                          return <div key={i}>{msg}</div>
                      })}
                  </Alert>
                }       
              </div>
              <MaterialTable
              title="Tabel Nilai"
              columns={columns}
              data={state}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      console.log(newData);
                      handleRowAdd(newData, resolve)
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
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
          </CardContent>
      </Card>
    </Wrapper>
  );
}


export default Nilai;
