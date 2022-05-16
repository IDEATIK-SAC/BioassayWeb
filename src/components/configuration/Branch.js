import React, { useState,useEffect } from "react";
import { Container, Grid , Button, Typography  ,FormControl,Select,MenuItem} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import ModalBranch from "./components/modalBranch";
import { getLines,getBranchByLine,deleteBranch,getBranchById } from "../../services/api/ConfigService";
import swal from 'sweetalert';

const BranchConfig =()=>{
const [ lines, setLines] = useState([]);
const [ lineid, setLineId ] = useState(0);
const [ branchid, setBranchId ] = useState(0);
const [ rows, setRows ] = useState([]);

const [ openLine, setOpenLine ] = useState(false);
const handleOpenLine =()=>{
  setOpenLine(!openLine);
}

useEffect(() => { 
    getLines().then(response =>{
        setLines(response.data);
    });
    getBranchByLine(lineid).then(response =>{
        setRows(response.data);
    })
}, [openLine,lineid])

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
                    > Editar
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
                        style={{ marginLeft: 16, backgroundColor:"red" }}
                        onClick={DeleteBranchServer} 
                    > Eliminar
                  </Button>
                </strong>
            ),
        }
      ];
      
      const DeleteBranchServer = () =>{
        getBranchById(branchid).then(response => {
            if(response.data != null){
                deleteBranch(response.data).then(response => {
                    swal("Buen trabajo!", "La marca a sido eliminada con éxito", "success")
                            .then(() => { 
                                getBranchByLine(lineid).then(response =>{
                                    setRows(response.data);
                                })
                            });
                });
            }
        });
      }
     

      const onclickbutton =()=>{
        setBranchId(0);
        handleOpenLine();
      }

    return(
        <Container maxWidth>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography style={{textAlign :"center"}} variant={'h3'}> Marcas</Typography>
                </Grid>
                <Grid item xs={8}>
                <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth
                        label="Linea"
                        name="lineid"
                        value={lineid || 0}
                        onChange={(e =>{
                            const lineid = e.target.value;
                            setLineId(lineid);
                            getBranchByLine(lineid).then(response =>{
                                setRows(response.data);
                            })
                        })}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(lines.map((n) => 
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
                    <ModalBranch isOpen={openLine} handleClose={handleOpenLine} branchid={branchid} />
                </Grid>
                <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        onSelectionModelChange={(newselection) =>{
                            setBranchId(newselection.selectionModel[0]);
                        }}  
                    />
                    </div>
                  </Grid>
            </Grid>
        </Container>
    );
}

export default BranchConfig;