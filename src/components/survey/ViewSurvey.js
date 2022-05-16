import { Container, Grid,Typography,CardMedia, Button ,TextField} from "@material-ui/core";
import React from "react"
import logoicon from '../logoicon.jpeg';

const Survey =()=>{
    return(
        <Container fullwidth style={{marginTop:50}}>
            <Grid container spacing={2}>,
            <Grid item  md={3} xs={12} >
                <CardMedia
                    style={{height: 200, width: 200}}
                    component="img"
                    alt="Biossay"
                    height="auto"
                    image={logoicon}
                />
                </Grid>
                <Grid item  md={5} xs={12}>
                    <Typography variant="h4" style={{ fontWeight:"bold" ,height:"30%"}}>BIOSSAY PERU</Typography>
                    <Typography style={{ height:"30%"}}>OFICINA PRINCIPAL - CALLE LAS CERECITAS MZ. L III LOTE 45 URB. INCA MANCO CAPAC SAN JUAN DE LURIGANCHO - LIMA - LIMA</Typography>
                    <Typography style={{ height:"10%"}}>TELEFONO: (01) 458-6631</Typography>
                    <Typography style={{ height:"10%"}}>CEL: 991463701 / 980658053</Typography>
                    <Typography style={{ height:"10%"}}>EMAIL : gerencia@biossay.com.pe</Typography>
                </Grid>
                <Grid item  md={4} xs={12} style= {{ borderStyle : "solid",textAlign:"center"}} >
                    <Typography  variant="h5"  style={{ height:"33%"}}>RUC 20563090805</Typography>
                    <Typography  variant="h5"  style={{ height:"33%" ,fontWeight:"bold" }}>Proforma</Typography>
                    <Typography  variant="h5"  style={{ height:"33%"}}>0001-2821</Typography>
                </Grid>
                <Grid item  md={6} xs={12} >
                    <Typography  variant="h6">Le hicieron llegar la solicitud</Typography>
                    <Button>Si</Button>
                    <Button>No</Button>
                </Grid>
                <Grid item  md={6} xs={12} >
                    <Typography  variant="h6">Acordaron la fecha y hora?</Typography>
                    <Button>Si</Button>
                    <Button>No</Button>
                    
                </Grid>
                <Grid item  md={6} xs={12} >
                    <Typography  variant="h6">Le hicieron llegar la solicitud</Typography>
                    <Button>Si</Button>
                    <Button>No</Button>
                    
                </Grid>
                <Grid item  md={6} xs={12} >
                    <Typography  variant="h6">Acordaron la fecha y hora?</Typography>
                    <Button>Si</Button>
                    <Button>No</Button>
                </Grid>
                <Grid item  md={6} xs={12} >
                    <Typography  variant="h6">Emitieron certificado</Typography>
                    <Button>Si</Button>
                    <Button>No</Button>
                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Se identifico el personal de servicio?</Typography>
                    <TextField fullWidth variant="outlined"></TextField>
                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Vestia apropiadamente?</Typography>
                    <TextField fullWidth variant="outlined"></TextField>
                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Contaba con la herramienta?</Typography>
                    <TextField fullWidth variant="outlined"></TextField>
                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Explico adecuadamente las tareas realizadas?</Typography>
                    <TextField fullWidth variant="outlined"></TextField>
                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Se encuentra satisfecho con nuestro servicio?</Typography>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                    <Button>5</Button>

                </Grid>
                <Grid item  md={12} xs={12} >
                    <Typography  variant="h6">Tiene alguna recomendación</Typography>
                    <TextField fullWidth variant="outlined"></TextField>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Survey;