import React,{ useEffect, useState} from "react";
import { Container,Grid,Typography,TextField,Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'; 
import { getReportsFull  } from "../../services/api/ReportService";

const ListReport = (props)=>{
    
    const [ rows , setRows] = useState([]);
    const [ reportId , setDemandId] = useState([]);

    useEffect(() => {
        getReportsFull().then(response =>{
            console.log(response);
            setRows(response.data);
        });
    }, [true])

    const columns = [
        { field: 'id', headerName: 'Nº', width: 100 },
        { field: 'reasonSocial', headerName: 'Cliente', width: 400},
        { field: 'request', headerName: 'Solicitud', width: 140},
        { field: 'team', headerName: 'Equipo', width: 150 },
        { field: 'model', headerName: 'Modelo', width: 180 },
        {
          field: 'detail',
          headerName: 'Detalle',
          description: 'This column has a value getter and is not sortable.',
          width: 140,
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
    
      const goToDetaillUser =()=>{
        props.history.push('/report/' + reportId);
    }

    const gotNew =()=>{
        props.history.push('/report');
      }

    

    return(
        <Container>
               <Grid container spacing={2} style={{marginTop:30}}>
                <Grid item md={12} justify="center" alignItems="center">
                    <Typography variant="h4">Reportes Realizados </Typography> 
                </Grid>
                    <Grid item md={4}>
                    <TextField fullWidth id="outlined-basic" label="Razón Social" variant="outlined" />
                    </Grid>
                    <Grid item md={4}>
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
export default ListReport;