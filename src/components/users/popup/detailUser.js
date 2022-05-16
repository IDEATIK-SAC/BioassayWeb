import React, { useEffect, useState } from "react"
import {Dialog,DialogTitle,FormControl,DialogContent,TextField,DialogActions,Button,Select,MenuItem} from "@material-ui/core";
import { getEmployeeById,SaveEmployeer } from "../../../services/api/LoginService";
import swal from 'sweetalert';

const DetailUser = (props)=>{
const { isOpen, handleClose ,userid } = props;

const [ employeer, setEmployeer] = useState({
    Id: 0,
    Name : '',
    Email : '',
    Phone : '',
    Login : '',
    Password : '',
    UserProfileId : 0,
    IsActive : true
});
const saveUserLocal = (e)=>{ 
    setEmployeer({ ...employeer, [e.target.name]: e.target.value });
}

const SendEmployeer=()=>{
    SaveEmployeer(employeer).then(response =>{
        swal("Buen trabajo!", "El usuario a sido guardado con éxito", "success")
        .then(() => { 
            clearFields();
            handleClose();
    });
}) 
}

const clearFields = ()=>{
    setEmployeer({
        Id: 0,
        Name : '',
        Email : '',
        Phone : '',
        Login : '',
        Password : '',
        UserProfileId : 0,
        IsActive : true
    });
}

useEffect(() => {
    if (userid > 0) {
        getEmployeeById(userid).then(response =>{
            setEmployeer({
                Id: response.data.id,
                Name : response.data.name,
                Email : response.data.email,
                Phone : response.data.phone,
                Login : response.data.login,
                Password : response.data.password,
                UserProfileId : response.data.userProfileId,
                IsActive : true
            })
        })
    }else{
        setEmployeer({});
    }
  
}, [userid])

    return(
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modelo</DialogTitle>
   <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            name="Name"
            value={employeer.Name}
            label="Nombre"
            onChange={saveUserLocal}
            type="text"
            fullWidth
            />
                        <TextField
            autoFocus
            margin="dense"
            name="Email"
            value={employeer.Email}
            label="Correo"
            onChange={saveUserLocal}
            type="text"
            fullWidth
            />
                        <TextField
            autoFocus
            margin="dense"
            name="Phone"
            value={employeer.Phone}
            label="Teléfono"
            onChange={saveUserLocal}
            type="text"
            fullWidth
            />
           <TextField
            autoFocus
            margin="dense"
            name="Login"
            value={employeer.Login}
            label="Login"
            onChange={saveUserLocal}
            type="text"
            fullWidth
            />
         <TextField
            autoFocus
            margin="dense"
            name="Password"
            value={employeer.Password}
            label="Contraseña"
            onChange={saveUserLocal}
            type="password"
            fullWidth
            />
                <FormControl style={{marginTop:15}} fullWidth variant="standard"  > 
                        <Select
                        fullWidth
                        name="UserProfileId"
                        value={employeer.UserProfileId}
                        onChange={saveUserLocal}
                        >
                        <MenuItem value={0}>
                            <em>Seleccione un perfil </em>
                        </MenuItem>
                        
                          <MenuItem key={"1"} value={1}> Administrador </MenuItem>
                          <MenuItem key={"2"} value={2}> Asesor Comercial </MenuItem>
                          <MenuItem key={"3"} value={3}> Asesor Cientifico e Ingeniero </MenuItem>
                          <MenuItem key={"4"} value={4}> Jefe de Ventas </MenuItem>
                          <MenuItem key={"5"} value={5}> Jefe de Servicios </MenuItem>
                          <MenuItem key={"6"} value={6}> Cliente </MenuItem>
                       
                        </Select>
                    
                    </FormControl>
   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose} color="primary">
       Salir
     </Button>
     <Button onClick={SendEmployeer} color="primary">
       Guardar
     </Button>
   </DialogActions>
   </Dialog>
    );
}
export default DetailUser;