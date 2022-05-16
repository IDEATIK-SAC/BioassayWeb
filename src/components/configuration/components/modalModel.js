import React,{useState,useEffect} from "react";
import {Dialog,DialogTitle,FormControl,DialogContent,TextField,DialogActions,Button,Select,MenuItem} from "@material-ui/core";
import { getBranches,saveModelLine, getModelLineById } from "../../../services/api/ConfigService";
import swal from 'sweetalert';


const ModalModel= (props)=>{
const { isOpen, handleClose ,modelId } = props;
const [ branches , setBranches] = useState([]);
const [ model, setModel] = useState({
  Id: 0,
  Name : '',
  BranchId : 0
});

useEffect(() => {
    getBranches().then(response =>{
      setBranches(response.data)
    });  
    if (modelId > 0) {
      getModelLineById(modelId).then(response =>{
        setModel({
          Id: response.data.id,
          Name : response.data.name,
          BranchId : response.data.branchId
        });
    }).catch(error =>{
      setModel({
        Id: 0,
        Name : '',
        BranchId : 0
      });
    });
    }else{
      setModel({
        Id: 0,
        Name : '',
        BranchId : 0
      });
    }

}, [isOpen,modelId])

const saveModelLocal = (e)=>{
  const { name , value } = e.target;

  setModel((last) => ({
    ...last,
    [name]: value
  }));
}

const sendModelServer = ()=>{
  saveModelLine(model).then(response =>{
    swal("Buen trabajo!", "El modelo a sido guardado con éxito", "success")
    .then(() => { 
      handleClose();     
    }); 
  });
}

    return(
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Modelo</DialogTitle>
        <DialogContent>
        <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth
                        label="Marca"
                        name="BranchId"
                        value={model.BranchId || '0'}
                        onChange={saveModelLocal}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(branches.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
                      </Select>
                    
                    </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="Name"
            value={model.Name}
            label="Descripción"
            onChange={saveModelLocal}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Salir
          </Button>
          <Button onClick={sendModelServer} color="primary">
            Guardar
          </Button>
        </DialogActions>
        </Dialog>
    )
}
export default ModalModel;