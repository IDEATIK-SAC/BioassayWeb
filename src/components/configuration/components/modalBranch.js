import React,{ useEffect, useState} from "react";
import {Dialog,DialogTitle,DialogContent,
  TextField,DialogActions,Button,FormControl,Select , MenuItem} from "@material-ui/core";
import { saveBranch, getBranchById ,getLines} from "../../../services/api/ConfigService";
import swal from 'sweetalert';


const ModalBranch = (props)=>{
const { isOpen, handleClose,branchid  } = props;

const [ branch, setBranch] = useState({
  Id : 0,
  Name: '',
  LineId : 0
});

const [ lines, setLines] = useState([]);

useEffect(() => {
  if (isOpen) {
    getLines().then(response =>{
      setLines(response.data);
  })
  if(branchid > 0){
    getBranchById(branchid).then(response =>{
      
      setBranch({
        Id : response.data.id,
        Name : response.data.name,
        LineId : response.data.lineId
      })
    });
  }else{
    setBranch({
      Id : 0,
      Name : '',
      LineId : 0
    })
    }
  }
}, [isOpen,branchid])

const saveBranchLocal = (e) =>{
  const { name , value} = e.target;

  setBranch((last) => ({
     ...last,
     [name] : value
  }));
}

const sendBranchServer = ()=>{
  saveBranch(branch).then(response => {
    swal("Buen trabajo!", "La marca a sido guardado con éxito", "success")
    .then(() => {  
        handleClose();
    });
     
  });
}

    return(
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
             <DialogTitle id="form-dialog-title">Marca</DialogTitle>
        <DialogContent>

           <FormControl fullWidth variant="outlined"  > 
                    <Select 
                        fullWidth
                        label="Linea"
                        name="LineId"
                        value={branch.LineId || '0'}
                        onChange={saveBranchLocal}
                        >
                        <MenuItem value="0">
                            <em>Seleccione</em>
                        </MenuItem>
                        {(lines.map((n) => 
                          <MenuItem value={n.id}>{n.name}</MenuItem>
                        ))}
                      </Select>
                    
                    </FormControl>

                     
          <TextField
            autoFocus
            margin="dense"
            label="Descripción"
            type="text"
            name="Name"
            value={branch.Name || ''}
            onChange={saveBranchLocal}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Salir
          </Button>
          <Button onClick={sendBranchServer} color="primary">
            Guardar
          </Button>
        </DialogActions>
        </Dialog>
    )
}
export default ModalBranch;