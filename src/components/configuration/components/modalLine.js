import React, { useState ,useEffect } from "react";
import {Dialog,DialogTitle,DialogContent,TextField,DialogActions,Button} from "@material-ui/core";
import { saveLine,getLineById } from "../../../services/api/ConfigService";
import swal from 'sweetalert';


const ModalLine = (props)=>{
const { isOpen, handleClose ,lineId } = props;
const [ line, setLine] = useState({ 
  Id : 0,
  Name : ''
});

useEffect(() => {
  if (lineId > 0) {
  getLineById(lineId).then(response =>{
    setLine({
      Id : response.data.id,
      Name: response.data.name
    });
    
  });
  }
}, [lineId])

const saveLocalLine =(e)=>{
  const { name, value} = e.target;
  setLine((last)=>({
    ...last,
    [name] : value
  }));
}

const sendLocalLine = ()=>{
  saveLine(line).then(response =>{
    swal("Buen trabajo!", "La linea a sido guardado con éxito", "success")
    .then(() => { 
      handleClose();
    }); 
  })
}


    return(
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title"> { (lineId > 0 ? ' Editar ': 'Nueva Linea')} </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense" 
            name="Name"
            type="text"label="Descripción" variant="outlined"
            value={line.Name} 
            onChange={saveLocalLine}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cerrar</Button>
          <Button onClick={sendLocalLine} color="primary"> Guardar  </Button>
        </DialogActions>
        </Dialog>
    )
}
export default ModalLine;