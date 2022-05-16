import React, { useState, useEffect } from "react";
import {Dialog,DialogTitle,FormControl,DialogContent,TextField,DialogActions,Button,Select,MenuItem} from "@material-ui/core";
import { getRUC,saveClientServer,getClientById,getRUCSunat ,validateRUCClient} from "../../../services/api/ClientService";
import swal from 'sweetalert';


const ModalCustomer = (props)=>{
const { isOpen, handleClose,customerId } = props;

const [customer, setCustomer] = useState({
    Id:0,
    CustomerName:'',
    CustomerAddress:'',
    RUCClient:'',
    CategoryId:0
});

useEffect(() => {
    if(customerId > 0){
        getCustomerById(customerId);
    }else{
        setCustomer({});
    }
}, [customerId])

const getCustomerById=(customerId)=>{
    getClientById(customerId).then(response =>{
        setCustomer((last)=>({
            ...last,
            Id:response.data.id,
            CustomerName: response.data.customerName,
            CustomerAddress: response.data.customerAddress,
            RUCClient: response.data.rucClient,
            CategoryId: response.data.categoryId
        })
    )})
};

const onChangeRUC = (e)=>{
    let value = e.target.value;
    getRUC(value).then(responsedata =>{ 
        const {response} = responsedata; 
        if(response  ===  null){
            getRUCSunat(value).then(response =>{
                const { data } = response;
                setCustomer((last)=>({
                    ...last,
                    CustomerName : data.nombre_o_razon_social,
                    CustomerAddress : data.direccion_completa,
                }),  
                )
            })
        }else{
            setCustomer((last)=>({
                ...last,
                Id:response.id,
                CustomerName: response.customerName,
                CustomerAddress: response.customerAddress,
                RUCClient: response.rucClient,
                CategoryId: response.categoryId
            }))
        }
 
    });
}

const onChangeCustomer = (e)=>{
    setCustomer({ ...customer, [e.target.name]: e.target.value });
}

const saveCustomerServer =()=>{
    validateRUCClient(customer).then(response => {
        console.log(response);
        if(response.isSuccess){
            if (response.response === null) {
                saveClientServer(customer).then(response =>{ 
                    console.log(response);
                    if(response.isSuccess){
                        if(response.response > 0){
                            swal("Buen trabajo!", "El cliente a sido guardado con éxito", "success")
                            .then(() => { 
                                clearFieldsCustomer();
                                handleClose();
                            });
                        }
                    } 
                });
            }else{
                swal("Información!", "El cliente ya se encuentra registrado", "info")
            }
        }
    }) 
}

const clearFieldsCustomer =()=>{
    setCustomer({
        CategoryId : 0,
        CustomerAddress : '',
        CustomerName : '',
        Id :0,
        RUCClient : ''
    });
}
    return(
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modelo</DialogTitle>
        <DialogContent>
            <TextField
                    
                    margin="dense"
                    name="RUCClient"
                    label="RUC"
                    type="text"
                    value={customer.RUCClient || ''}
                    onBlur={onChangeRUC}
                    onChange={onChangeCustomer}
                    fullWidth
                    />
                <TextField
                    autoFocus
                    margin="dense"
                    name="CustomerName"
                    label="Nombre"
                    type="text"
                    value={customer.CustomerName || ''}
                    onChange={onChangeCustomer}
                    fullWidth
                    />
                  <TextField
                    autoFocus
                    margin="dense"
                    name="CustomerAddress"
                    value={customer.CustomerAddress || ''}
                    label="Dirección"
                    onChange={onChangeCustomer}
                    type="text"
                    fullWidth
                    />
              <FormControl style={{marginTop:15}} fullWidth variant="standard"  > 
                                <Select
                                fullWidth
                                name="CategoryId"
                                value={customer.CategoryId || 0}
                                label="Categoria"
                                onChange={onChangeCustomer}
                                >
                                <MenuItem value={0}>
                                    <em>Seleccione una categoria </em>
                                </MenuItem>
                                
                                <MenuItem value={1}>SIN CATEGORIA</MenuItem>
                                <MenuItem value={2}>BRONZE</MenuItem>
                                <MenuItem value={3}>SILVER</MenuItem>
                                <MenuItem value={4}>GOLD</MenuItem>
                                <MenuItem value={5}>PLATINUM</MenuItem>
                                <MenuItem value={6}>DIAMOND</MenuItem>
                            
                                </Select>
                            
                            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Salir
            </Button>
            <Button onClick={saveCustomerServer}  color="primary">
            Guardar
            </Button>
        </DialogActions>
        </Dialog>
    );
}

export default ModalCustomer;