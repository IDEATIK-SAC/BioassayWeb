import  React,{ useEffect, useState} from 'react';
import { Container , Grid, TextField, Typography,Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { GetRequestsDocuments } from '../../services/api/Demandservice';

const ListDemand = (props)=>{

  const [ rows , setRows] = useState([]);
  const [ demandId , setDemandId] = useState([]);

  const columns = [
    { field: 'id', headerName: 'Nº', width: 100 },
    { field: 'categoria', headerName: 'Categoria', width: 150 },
    { field: 'fEmision', headerName: 'Emisión', width: 180 },
    { field: 'nameClient', headerName: 'Cliente', width: 400},
    { field: 'rucClient', headerName: 'RUC', width: 150},
    { field: 'userAssing', headerName: 'Asesor Comercial', width: 200 },
    { field: 'responsible', headerName: 'Asesor Cientifico', width: 200 },
    { field: 'report', headerName: 'Reporte', width: 140,renderCell:(params) =>(
      <strong>
        {(params.formattedValue === 'Si') ? <Button style={{ backgroundColor : "green", color:"white"}}> Si </Button> : <Button style={{ backgroundColor : "red",color:"white"}}> No </Button>} 
      </strong>
      
      )},
    {
      field: 'detail',
      headerName: 'Detalle', 
      width: 160,
      renderCell: (params) => (
          <strong>
              <Button
                  variant="contained"
                  size="small"
                  color="secondary"
                  style={{ marginLeft: 16 }}
                  onClick={goToDetaillUser}
                  
              >
                  Detalle
            </Button>
          </strong>
      ),
  },
  ];
 

  useEffect(() => {
    GetRequestsDocuments().then(response =>{    
        
        setRows(response.data);
    });
  }, [])

  const goToDetaillUser =()=>{
    props.history.push('/demand/' + demandId);
}
    
const gotNew =()=>{
  props.history.push('/demand');
}

    return(
        <Container>
            <Grid container spacing={2} style={{marginTop:30}}>
            <Grid item md={12} justify="center" alignItems="center">
              <Typography variant="h4">Solicitudes Realizadas </Typography>
 
            </Grid>
              <Grid item md={3}>
              <TextField fullWidth id="outlined-basic" label="RUC" variant="outlined" />
            </Grid>
            <Grid item md={3}>
            <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" />
            </Grid>
            <Grid item md={3}>
            <TextField fullWidth id="outlined-basic"   type="date" variant="outlined" />
            </Grid>
            <Grid item md={3}>
             <Button onClick={gotNew} variant="contained" >Nuevo</Button>

            </Grid>
            <div style={{ height: 400, width: '100%',marginTop:20 }}>
                    
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        onSelectionModelChange={(newselection) =>{
                          setDemandId(newselection.selectionModel[0]);
                      }}  
                    />
                </div>
            </Grid>
        </Container>
    );
}

export default ListDemand;