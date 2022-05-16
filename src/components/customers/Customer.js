import React, { useState, useEffect} from "react";
import { Container, Grid,Typography,TextField,Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { getClientFull,deleteClientServer,getClientById } from "../../services/api/ClientService";
import ModalCustomer from "./components/modalCustomer";
import swal from 'sweetalert';

const Customer = () =>{
    const [ rows , setRows] = useState([]);
    const [ customerId , setCustomerId] = useState(0); 
    const [ openLine, setOpenLine ] = useState(false);

    const handleOpenLine =()=>{
        setOpenLine(!openLine);
      }

      const onclickbutton =()=>{
        setCustomerId(0);
        handleOpenLine();
      }

    useEffect(() => {
       getCustomerAll();
    }, [openLine])

    const getCustomerAll =()=> { 
        getClientFull().then(response =>{
            
            setRows(response.data);
        });
    }

    const columns = [
      { field: 'id', headerName: 'Nº', width: 100 },
      { field: 'customerName', headerName: 'Nombre', width: 200 },
      { field: 'customerAddress', headerName: 'Dirección', width: 200 },
      { field: 'rucClient', headerName: 'RUC', width: 200 },
      { field: 'categoryName', headerName: 'Categoria', width: 200 },
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
                > Detalle
              </Button>
            </strong>
        ),
    },
    {
        field: 'delete',
        headerName: 'Eliminar', 
        width: 160,
        renderCell: (params) => (
            <strong>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={{ marginLeft: 16 ,backgroundColor:"red" }}
                    onClick={deleteUser} 
                > Eliminar
              </Button>
            </strong>
        ),
    },
    ];

    const goToDetaillUser = ()=>{
        setOpenLine(!openLine);
    }

    const deleteUser = ()=>{ 
              getClientById(customerId).then(response => {
                  console.log(response);
                    if (response.data != null) {
                        deleteClientServer(response.data).then(response => { 
                            swal("Buen trabajo!", "El cliente a sido eliminado con éxito", "success")
                            .then(() => { 
                                getCustomerAll();
                            });
                        });
                    }
                });

       
    }


    return(
        <Container fullwidth>
            <Grid container spacing={2}>
                <Grid item md={12} justify="center" alignItems="center">
                    <Typography variant="h4"> Clientes </Typography>
                </Grid>
                <Grid item md={4}>
                     <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" />
                </Grid>
            <Grid item md={4}>
                <TextField fullWidth id="outlined-basic" label="RUC" variant="outlined" />
            </Grid>
            <Grid item md={4}>
             <Button onClick={onclickbutton}  variant="contained" >Nuevo</Button>
             <ModalCustomer isOpen={openLine} handleClose={handleOpenLine} customerId={customerId}  />
            </Grid>
            <div style={{ height: 400, width: '100%',marginTop:20 }}>
                    
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        onSelectionModelChange={(newselection) =>{
                          setCustomerId(newselection.selectionModel[0]);
                      }}  
                    />
                </div>
            </Grid>
        </Container>
    );
}

export default Customer;