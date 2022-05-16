import React, { useState,useEffect } from "react";
import { Container, Grid , Button, Typography  ,TextField} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import ModalLine from "./components/modalLine";
import { getLines,deleteLine,getLineById } from "../../services/api/ConfigService";
import swal from 'sweetalert';

const ServicesConfig =()=>{

    const [ openLine, setOpenLine ] = useState(false);
    const [ rows ,setRows] = useState([]);
    const [ lineId ,setLineId] = useState(0);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90,identity: true },
        { field: 'name', headerName: 'Descripción', width: 250},
        { field: 'edit', headerName: 'Editar', width: 160,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        style={{ marginLeft: 16 }}
                        onClick={onclickbutton}>
                        Editar
                  </Button>
                </strong>
            ),
        },
        { field: 'detail', headerName: 'Eliminar', width: 160,
        renderCell: (params) => (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={{ marginLeft: 16, backgroundColor : "red" }}
                    onClick={deleteLineServer}
                >  Eliminar
              </Button>
            </strong>
        ),
    },
      ];

      useEffect(() => {
        getLines().then(response =>{ 
            setRows(response.data);
        })         
      }, [openLine])
      
      const deleteLineServer = () =>{
        getLineById(lineId).then(response => {
            if (response.data != null) {
                deleteLine(response.data).then(response => {
                    if(response.data){
                        swal("Buen trabajo!", "La linea a sido eliminada con éxito", "success")
                        .then(() => { 
                            getLines().then(response =>{ 
                                setRows(response.data);
                            })        
                    });
                    }
                });
            }
        });
      }


      const handleOpenLine =()=>{
        setOpenLine(!openLine);
      }

      const onclickbutton =()=>{
        handleOpenLine();
      }

    return(
        <Container maxWidth style={{ marginTop:20}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography style={{textAlign :"center"}} variant={'h3'}> Lineas</Typography>
                </Grid>
                <Grid item xs={8}>
                 <TextField fullWidth label="Descripción" variant="outlined" />
                </Grid>
                <Grid item xs={2}>
                    <Button  fullWidth variant="contained">Buscar</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={onclickbutton} fullWidth variant="contained">Nuevo</Button>
                    <ModalLine isOpen={openLine} handleClose={handleOpenLine} lineId = {lineId}/>
                </Grid>
                <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        onSelectionModelChange={(newselection) =>{
                            setLineId(newselection.selectionModel[0]);
                        }}  
                    />
                    </div>
                  </Grid>
            </Grid>
        </Container>
    );
}

export default ServicesConfig;