import React,{useState,useEffect} from "react"
import { Container,Grid,Typography,TextField,Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { getEmployeers ,deleteEmployee,getEmployeeById} from "../../services/api/LoginService";
import DetailUser from "./popup/detailUser";
import swal from 'sweetalert';

const ListUser = ()=>{
    const [ rows , setRows] = useState([]);
    const [ userid , setUserId] = useState(0); 
    const [ openLine, setOpenLine ] = useState(false);

    const handleOpenLine =()=>{
        setOpenLine(!openLine);
      }

      const onclickbutton =()=>{
        setUserId(0);
        handleOpenLine();
      }

    const columns = [
      { field: 'id', headerName: 'Nº', width: 100 },
      { field: 'name', headerName: 'Nombre', width: 200 },
      { field: 'email', headerName: 'Correo', width: 200 },
      { field: 'phone', headerName: 'Telèfono', width: 200 },
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
                  style={{ marginLeft: 16 ,backgroundColor:"red"}}
                  onClick={deleteEmployeeServer}
                  
              >
                  Eliminar
            </Button>
          </strong>
      ),
  }
    ];
    


    const goToDetaillUser = ()=>{
        setOpenLine(!openLine);
    }

    useEffect(() => {
        getEmployeers().then(response =>{
            setRows(response.data);
        });
    }, [openLine])

    const deleteEmployeeServer = ()=>{
      getEmployeeById(userid).then(response => {
        if(response.data){
          deleteEmployee(response.data).then(response => {
            if(response.data){
              swal("Buen trabajo!", "El usuario a sido eliminado con éxito", "success")
                 .then(() => { 
                  getEmployeers().then(response =>{
                    setRows(response.data);
                });

                });
            }
          });
        }
      });
    }

    return(
        <Container>
            <Grid container spacing={2} style={{marginTop:30}}>
            <Grid item md={12} justify="center" alignItems="center">
              <Typography variant="h4"> Usuarios del Sistema </Typography>
            </Grid>
            <Grid item md={3}>
              <TextField fullWidth id="outlined-basic" label="Nombre" variant="outlined" />
            </Grid>
            <Grid item md={3}>
            <TextField fullWidth id="outlined-basic" label="Usuario" variant="outlined" />
            </Grid>
            <Grid item md={3}>
            <TextField fullWidth id="outlined-basic" label="Login" variant="outlined" />
            </Grid>
            <Grid item md={3}>
             <Button onClick={onclickbutton} variant="contained" >Nuevo</Button>
             <DetailUser isOpen={openLine} handleClose={handleOpenLine} userid={userid} />
            </Grid>
            <div style={{ height: 400, width: '100%',marginTop:20 }}>
                    
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        onSelectionModelChange={(newselection) =>{
                          setUserId(newselection.selectionModel[0]);
                      }}  
                    />
                </div>
            </Grid>
        </Container>
    );

}
export default ListUser;