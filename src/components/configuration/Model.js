import React, { useState ,useEffect} from "react";
import { Container, Grid , Button, Typography  ,FormControl,Select,MenuItem} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import ModalModel from "./components/modalModel";
import { deleteModel, getBranches,getModelLinesByBranch ,getModelLineById} from "../../services/api/ConfigService";
import swal from 'sweetalert';


const ModelConfig =()=>{
    const [ modelId, setModelId] = useState(0);
    const [ openLine, setOpenLine ] = useState(false);
    const [ rows, setRows] = useState([]);
    const [ branches, setBranches] = useState([]);
    const [ branchId, setBranchId] = useState(0);

    useEffect(() => {
        getBranches().then(response =>{
            setBranches(response.data);
        })
    }, [openLine])

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'name', headerName: 'Descripción', width: 250},
        { field: 'edit', headerName: 'Editar', width: 160,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        style={{ marginLeft: 16 }}
                        onClick={handleOpenLine} 
                    >
                        Editar
                  </Button>
                </strong>
            ),
        },
        { field: 'delete', headerName: 'Eliminar', width: 160,
            renderCell: (params) => (
                <strong>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        style={{ marginLeft: 16 ,backgroundColor:"red"}}
                        onClick={deleteModelServer} 
                    >
                        Eliminar
                  </Button>
                </strong>
            ),
        }
      ];
            
      const handleOpenLine =()=>{
        setOpenLine(!openLine);
      }

      const onclickbutton =()=>{
        setModelId(0);
        handleOpenLine();
      }
      
      const deleteModelServer = ()=>{
          getModelLineById(modelId).then(response => {
              if (response.data != null) {
                  deleteModel(response.data).then(response => {
                      if(response.data){
                        swal("Buen trabajo!", "El modelo a sido eliminado con éxito", "success")
                        .then(() => { 
                            getModelLinesByBranch(branchId).then(response =>{
                                setRows(response.data);
                            })
                        }); 
                      }
                  });
              }
          })
      }

    return(
        <Container maxWidth>
            <Grid container spacing={2}>
                <Grid item xs={12}> 
                <Typography style={{textAlign :"center"}} variant={'h3'}> Modelos</Typography>

                </Grid>
                <Grid item xs={8}>
                <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth
                        label="Linea"
                        name="lineid"
                        value={branchId || 0}
                        onChange={(e =>{
                            const branch = e.target.value;
                            setBranchId(branch);
                            getModelLinesByBranch(branch).then(response =>{
                                setRows(response.data);
                            })
                        })}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(branches.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
                      </Select>
                    
                    </FormControl>

                </Grid>
                <Grid item xs={2}>
                    <Button  fullWidth variant="contained">Buscar</Button>
                </Grid>
                <Grid item xs={2}>
                    <Button onClick={onclickbutton} fullWidth variant="contained">Nuevo</Button>
                    <ModalModel isOpen={openLine} handleClose={handleOpenLine} modelId={modelId} />
                </Grid>
                <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        onSelectionModelChange={(newselection) =>{
                            setModelId(newselection.selectionModel[0]);
                        }}  
                    />
                    </div>
                  </Grid>
            </Grid>
        </Container>
    );
}

export default ModelConfig;