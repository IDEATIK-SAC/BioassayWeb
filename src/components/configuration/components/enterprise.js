import React, { useState , useEffect} from "react";
import { Container, Grid, Typography,TextField, Button } from "@material-ui/core";
import { saveCompany , getCompanyById} from "../../../services/api/CompanyService";

const Enterprise = ()=>{
    const [ company, setCompany] = useState({
         IdCompany : 0,
         Address : '',
         Branch:'',
         Phone : '',
         RUC: '',
         SocialReason:'',
         TradeName:''
    }); 

    useEffect(() => {
         getCompanyById(1).then(response =>{
               setCompany({
                    IdCompany : response.data.idCompany,
                    Address : response.data.address,
                    Branch : response.data.branch,
                    Phone : response.data.phone,
                    RUC : response.data.ruc,
                    SocialReason : response.data.socialReason,
                    TradeName : response.data.tradeName
               });
         }).catch(error =>{

         });
    }, [true])

    const saveCompanyLocal = (e)=>{
          const { name, value } = e.target;
          setCompany((last)=>({
               ...last,
               [name]:value
          }));
    }

    const sendCompany = ()=>{
         
         saveCompany(company).then(response =>{
               
         });
    }



    return(
        <Container>
                <Grid container spacing={2}>
                    <Grid item sm={12} >
                            <Typography> Datos de Empresa </Typography>
                    </Grid>
                    <Grid item sm={6}>
                         <TextField onChange={saveCompanyLocal} fullWidth  name="RUC" value={company.RUC} label="RUC" variant="outlined" />
                    </Grid>
                    <Grid item sm={6}>
                         <TextField onChange={saveCompanyLocal} fullWidth  name="SocialReason" value={company.SocialReason} label="Razón Social" variant="outlined" />
                    </Grid>
                    <Grid item sm={6}>
                         <TextField onChange={saveCompanyLocal} fullWidth name="TradeName" value={company.TradeName} label="Nombre Comercial" variant="outlined" />
                    </Grid>
                    <Grid item sm={6}>
                         <TextField onChange={saveCompanyLocal} fullWidth name="Address" value={company.Address} label="Dirección" variant="outlined" />
                    </Grid>
                    <Grid item sm={6}>
                         <TextField  onChange={saveCompanyLocal} fullWidth  name="Phone" value={company.Phone} label="Teléfono" variant="outlined" />
                    </Grid>
                    <Grid item sm={6}>
                         <TextField  onChange={saveCompanyLocal} fullWidth name="Branch" value={company.Branch} label="Sucursal" variant="outlined" />
                    </Grid>
                    <Grid item sm={12}>
                         <Button variant="contained" onClick={sendCompany} style={{color:"white"}} color="primary" >Guardar</Button>
                    </Grid>
                </Grid>
        </Container>
    );
}
export default Enterprise;