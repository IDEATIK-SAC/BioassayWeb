import { Container , Grid, TextField, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

import  React from 'react';

const columns = [
    { field: 'name', headerName: 'Nº', width: 100, editable: true },
    { field: 'age', headerName: 'Linea', width: 160, editable: true },
    {
      field: 'dateCreated',
      headerName: 'Modelo',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Medio',
      type: 'dateTime',
      width: 220,
      editable: true,
    },    
    {
        field: 'lastLogin1',
        headerName: 'Servicio',
        type: 'dateTime',
        width: 220,
        editable: true,
      },
      {
        field: 'lastLogin2',
        headerName: 'Lugar',
        type: 'dateTime',
        width: 220,
        editable: true,
      },
  ];
 
  const rows2 = [
    {
      id: 1,
      name:'2',
      age: 25,
    },
  ];

const ListSurvey = ()=>{

      
    return(
        <Container>
            <Grid container spacing={2} style={{marginTop:30}}>
            <Grid item md={12} justify="center" alignItems="center">
              <Typography variant="h4">Encuestas Realizadas </Typography>
 
            </Grid>
              <Grid item md={3}>
              <TextField fullWidth id="outlined-basic" label="Numero de proforma" variant="outlined" />
            </Grid>
            <div style={{ height: 400, width: '100%',marginTop:20 }}>
                    
                    <DataGrid 
                        rows={rows2}
                        columns={columns}
                        isCellEditable={(params) => params.row.age > 0}
                    />
                </div>
            </Grid>
        </Container>
    );
}

export default ListSurvey;