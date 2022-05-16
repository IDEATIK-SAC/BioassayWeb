import React,{ useState,useEffect} from "react"; 
import { TableContainer, TableCell , FormControl,Select,MenuItem,
Table,TableBody,TableHead,TableRow,ListSubheader} from "@material-ui/core";
import { getLines,getBranchByLine,getModelLinesByBranch } from "../../../services/api/ConfigService";

const TableDemand = (props)=>{
 
    const { demandDetailModel, setDemandDetailModel} = props;
    const [ lines, setLines ] = useState([]);
    const [ branches, setBranches ] = useState([]);
    const [ models , setModels ] = useState([]);


    const saveDemandDeatil = (e)=>{
       const { name , value } = e.target;
       
       setDemandDetailModel((last) => ({
         ...last,
         [name] : value
       }))
    }

    useEffect(() => {
      console.log(demandDetailModel);
      getLinesAll();
    }, [true])

    const getLinesAll = ()=>{
      getLines().then(response => {
        setLines(response.data); 
        getBranchesAll();
      });
    }

    const getBranchesAll = ()=>{
      getBranchByLine(demandDetailModel.lineRequestDetail).then(response =>{
        setBranches(response.data);
        getModelsAll();
      });
    }

    const getModelsAll = ()=>{
      getModelLinesByBranch(demandDetailModel.mark).then(response =>{
        setModels(response.data);
      });
    }

    return(
      <TableContainer  >
      <Table   size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>LÍNEA</TableCell>
            <TableCell align="right">MARCA</TableCell>
            <TableCell align="right">MODELO</TableCell>
            <TableCell align="right">MEDIO</TableCell>
            <TableCell align="right">SERVICIO</TableCell>
            <TableCell align="right">LUGAR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow key={''}>
              <TableCell component="th" scope="row">
              <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth 
                        name="lineRequestDetail"
                        value={demandDetailModel.lineRequestDetail || '0'}
                        onChange={saveDemandDeatil}
                        onBlur = { getBranchesAll}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(lines.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
 
                        </Select>
                    
                    </FormControl>
              </TableCell>
              <TableCell align="right">
                <FormControl fullWidth variant="outlined"  > 
                      <Select
                          fullWidth 
                          name="mark"
                          value={demandDetailModel.mark || '0'}
                        onChange={saveDemandDeatil}
                          onBlur={getModelsAll}
                          >
                          <MenuItem value="0">
                              <em>Seleccione</em>
                          </MenuItem>
                          {(branches.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
                          </Select>
                      
                      </FormControl>
              </TableCell>
              <TableCell align="right">              
                 <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth 
                        name="model"
                        onChange={saveDemandDeatil}
                        value={demandDetailModel.model || '0'}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(models.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
                        </Select>
                    
                    </FormControl> 
              </TableCell>
              <TableCell align="right">               
              <FormControl fullWidth variant="outlined"  > 
                    <Select
                        fullWidth 
                        name="mediumRequestDetail"
                        onChange={saveDemandDeatil}
                        value={demandDetailModel.mediumRequestDetail || '0'}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        <MenuItem value={1}>VIRTUAL</MenuItem>
                        <MenuItem value={2}>PRESENCIAL</MenuItem>
                        </Select>
                    
                    </FormControl> 
                    </TableCell>
              <TableCell align="right">             
               <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth
                        name="serviceRequestDetail"
                        onChange={saveDemandDeatil}
                        value={demandDetailModel.serviceRequestDetail || '0'}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        <MenuItem value={1}>ASESORÍA CIENTÍFICA</MenuItem> 
                        <MenuItem value={2}>INSTALACIÓN</MenuItem> 
                        <MenuItem value={3}>CAPACITACIÓN</MenuItem>
                        <MenuItem value={4}>MANT. PREVENTIVO</MenuItem>
                        <MenuItem value={5}>MANT. CORRECTIVO</MenuItem> 
                        <MenuItem value={6}>RETIRO</MenuItem> 
                        </Select>
                    
                    </FormControl>
                     </TableCell>
                     <TableCell align="right">             
               <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth 
                        name="place"
                        onChange={saveDemandDeatil}
                        value={demandDetailModel.place || '0'}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        <MenuItem value={1}>OFICINA</MenuItem> 
                        <MenuItem value={2}>PROVINCIA</MenuItem>
                        <MenuItem value={3}>LIMA</MenuItem> 
                        </Select>
                    
                    </FormControl>
                     </TableCell>
            </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
    );
}
export default TableDemand;