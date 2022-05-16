import React,{ useState, useEffect} from "react"; 
import { Container, Grid ,CardMedia, Typography,TextField, Button,Select,FormControl,MenuItem} from "@material-ui/core";
import logoicon from '../logoicon.jpeg';
import TableDemand from './components/tableDemand';
import {  getClientById , getRUC} from "../../services/api/ClientService";
import { getEmployeeByType,getEmployeeAdviser } from "../../services/api/LoginService";
import { saveRequestDocument , GetRequestsDocumentById,GetCorrelative} from "../../services/api/Demandservice";
import { getCompanyById} from "../../services/api/CompanyService";
import { withRouter } from 'react-router-dom'; 
import { useStateValue } from '../../context/store'
import swal from 'sweetalert';


const Demand = (props) =>{
    const { match} = props;
    const demandid = match.params.demandid;

    

    const [ disabledfields , setDisabledFields] = useState({
        priority: false,
        responsible : false,
        scheduleddate : false
    });

    const [ demandModel , setDemandModel ] = useState({
        requestId : 0,
        applicationseries : '0001',
        clientID : 5,
        contact : '',
        correlativeNumber : '',
        customerAddress : '',
        dateofissue : '',
        idCategory : 0,
        idPriority : 0,
        phone : '',
        reason: '',
        responsible: '',
        scheduledDate: '',
        adviser :'',
        requestDeatils : [],
        lineRequestDetail:'0',
        mark:'0',
        mediumRequestDetail : '0',
        model:'0',
        numberRequestDetail:1,
        place:'0',
        serviceRequestDetail : '0'
    });

    const [ clientModel , setClientModel ] = useState({
        id : 0,
        customerName : '',
        customerAddress: '',
        rucClient : '',
        active : true
    });

    const [ companyModel, setCompanyModel] = useState({
        address : '',
        branch : '',
        idCompany : 0,
        phone : '',
        ruc:'',
        socialReason : '',
        tradeName : ''
    });

    const [ adivers, setAdvisers ] = useState([]);
    const [ otheradivers, setOtherAdvisers ] = useState([]);

    const [{ sessionUser }, dispatch] = useStateValue();

    useEffect(() => {
        checkRoleFields();
        if (demandid != null) {
            GetRequestsDocumentById(demandid).then(response =>{
                
                const { data } = response;
                setDemandModel(data);
                

                getClientById(data.clientID).then(response =>{
                const { data } = response; 
                setClientModel(data);
                });
            })
        }else{
            GetCorrelative().then(response =>{
                setDemandModel({ 
                  correlativeNumber : response.data
                })
            });
        }
        getCompanyById(1).then(response =>{ 
            setCompanyModel(response.data);
        }) 

        getAdvisers();
    }, [demandid])


    const checkRoleFields = ()=>{
        if(sessionUser.user.userProfileId === 2){
            setDisabledFields({
                priority : true,
                responsible : true,
                scheduleddate : true
            })
        }
    
    }

    const getAdvisers = ()=>{
        getEmployeeByType(2).then(response => {
            setAdvisers(response.data);
        });

        getEmployeeAdviser().then(response => {
            setOtherAdvisers(response.data);
        });
    }

    const saveDemand = (e) =>{
        const { name, value} = e.target;
        setDemandModel(last => ({
            ...last,
            [name]: value
        }))
    }

    const saveClient = (e) =>{
        const { name, value} = e.target;
        setClientModel(last => ({
            ...last,
            [name]: value
        }))
    }

    const sendClient = () => {
  
        saveRequestDocument(demandModel).then(response =>{
              
            if(response.data){
              swal("Buen trabajo!", "La solicitud a sido guardada", "success")
              .then(() => {
                props.history.push('/listdemand');
              });
            }else{
              swal({
                  title: "Revise los campos",
                  text: "Es necesario completar todos los campos de la solicitud",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                })
            }

         });
 

    }

    const getLocalRuc = ()=>{
        getRUC(clientModel.rucClient).then(response =>{
             console.log(response);
             if(response.response == null){
                swal("Información!", "El cliente no se encuentra registrado", "info");
             }else{
                setClientModel(response.response); 
                var now = new Date();
                var durationInMinutes = 300;
                now.setMinutes(now.getMinutes() - durationInMinutes);

                setDemandModel((last) =>({
                    ...last,
                    idCategory : response.response.categoryId,
                    clientID : response.response.id,
                    dateofissue : now.toISOString().slice(0,16),
                    idPriority : 6
                }))
             } 
        });
    }
 

    return(
        <Container fullwidth style={{marginTop:50}} >
            <Grid container spacing={2}>
                <Grid item  md={3} xs={4} >
                <CardMedia
                    style={{height: 200, width: 200}}
                    component="img"
                    alt="Biossay"
                    height="auto"
                    image={logoicon}
                />
                </Grid>
                <Grid item  md={5} xs={8}>
                    <Typography variant="h4" style={{ fontWeight:"bold" ,height:"30%"}}>{companyModel.tradeName}</Typography>
                    <Typography style={{ height:"30%"}}>{companyModel.address}</Typography>
                    <Typography style={{ height:"10%"}}>TELEFONO: {companyModel.phone}</Typography>
                    <Typography style={{ height:"10%"}}>CEL: 991463701 / 980658053</Typography>
                    <Typography style={{ height:"10%"}}>EMAIL : gerencia@bioassay.com.pe</Typography>
                </Grid>
                <Grid item  md={4} xs={12} style= {{ borderStyle : "solid",textAlign:"center"}} >
                    <Typography  variant="h5"  style={{ height:"33%"}}>RUC {companyModel.ruc}</Typography>
                    <Typography  variant="h5"  style={{ height:"33%" ,fontWeight:"bold" }}>SOLICITUD DE SERVICIO</Typography>
                    <Typography  variant="h5"  style={{ height:"33%"}}>0001-{demandModel.correlativeNumber}</Typography>
                </Grid>

                <Grid container md={6} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> RUC </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField type="number" fullWidth id="outlined-basic" label="" variant="outlined" onBlur={getLocalRuc}   onChange={saveClient} value={clientModel.rucClient} name="rucClient" />
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row"style={{marginTop:20}}  alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> F. EMISIÓN </Typography> 
                    </Grid>
                    <Grid item md={9} xs={8} direction="row">  
                        <TextField type="datetime-local" fullWidth id="outlined-basic" disabled={true} onChange={saveDemand} variant="outlined" value={demandModel.dateofissue} name="dateofissue" />
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> CLIENTE </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField fullWidth id="outlined-basic"  onChange={saveClient} variant="outlined" value={clientModel.customerName} name="customerName"  />
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row" style={{marginTop:20}}  alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> PRIORIDAD</Typography> 
                    </Grid>
                    <Grid item md={9} xs={8} direction="row">  
                    <FormControl fullWidth variant="outlined"  > 
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={demandModel.idPriority || 6} 
                        fullWidth
                        disabled={disabledfields.priority}
                        onChange={saveDemand}
                        label="Age"
                        name="idPriority"
                        >
                        <MenuItem value={0}>
                            <em>Ninguno</em>
                        </MenuItem>
                        <MenuItem value={1}><input type="color" value="#FF0000" disabled /> MUY URGENTE</MenuItem>
                        <MenuItem value={2}><input type="color" value="#1DEE2D" disabled /> URGENCIA MENOR</MenuItem>
                        <MenuItem value={3}><input type="color" value="#EEEA0D" disabled /> SIN URGENCIA</MenuItem>
                        <MenuItem value={6}><input type="color" value="#FFFFFF" disabled /> SIN SELECCIONAR</MenuItem>
                        </Select>
                    
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row"  style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> DIRECCIÓN </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField fullWidth id="outlined-basic"  onChange={saveClient} label="" variant="outlined" name="customerAddress" value={clientModel.customerAddress} />
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> ASESOR CIENTÍFCO </Typography> 
                    </Grid>
                    <Grid item md={9} xs={8} direction="row">  
                    <FormControl fullWidth variant="outlined"  > 
                        <Select
                        fullWidth
                        name="responsible"
                        value={demandModel.responsible || "0"}
                        onChange={saveDemand}
                        disabled={disabledfields.responsible} >
                        <MenuItem value="0">
                            <em>Seleccione un asesor </em>
                        </MenuItem>
                        {(otheradivers.map((n) => 
                          <MenuItem key={n.id} value={n.id}>{n.name} </MenuItem>
                        ))}
                        </Select>
                    
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> CATEGORÍA </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                    <FormControl fullWidth variant="outlined"  > 
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined" 
                        fullWidth
                        label="Age"
                        name="idCategory"
                        value={demandModel.idCategory}
                        onChange={saveDemand}
                        disabled={true}
                        >
                        <MenuItem value="">
                            <em>Seleccione</em>
                        </MenuItem>
                        <MenuItem value={1}>SIN CATEGORIA</MenuItem>
                        <MenuItem value={2}>BRONZE</MenuItem>
                        <MenuItem value={3}>SILVER</MenuItem>
                        <MenuItem value={4}>GOLD</MenuItem>
                        <MenuItem value={5}>PLATINUM</MenuItem>
                        <MenuItem value={6}>DIAMOND</MenuItem>
                        </Select>
                    
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container md={6} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> F. PROGAMADA </Typography> 
                    </Grid>
                    <Grid item md={9} xs={8}  direction="row">  
                        <TextField type="datetime-local" fullWidth id="outlined-basic" onChange={saveDemand} disabled={disabledfields.scheduleddate} label="" variant="outlined" name="scheduledDate" value={demandModel.scheduledDate} />
                    </Grid>
                </Grid> 
                
                <div style={{ height: 150, width: '100%',marginTop:20,marginBottom:20,overflow: "auto" }}>
                <TableDemand demandDetailModel={demandModel} setDemandDetailModel={setDemandModel}/> 
                   

                </div>
                <Grid container md={12} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> ASESOR COMERCIAL </Typography> 
                    </Grid>
                    
                    <Grid item md={8} xs={8} direction="row">  
                    <FormControl fullWidth variant="outlined"  > 
                        <Select
                        fullWidth
                        name="adviser"
                        value={demandModel.adviser || "0"}
                        onChange={saveDemand} >
                        <MenuItem value="0">
                            <em>Seleccione un supervisor </em>
                        </MenuItem>
                        {(adivers.map((n) => 
                          <MenuItem key={n.id} value={n.id}>{n.name} </MenuItem>
                        ))}
                        </Select>
                    
                    </FormControl>
                    </Grid>
                </Grid>
                <Grid container md={12} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> MOTIVO </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField fullWidth id="outlined-basic" label="" onChange={saveDemand} variant="outlined" name="reason" value={demandModel.reason} />
                    </Grid>
                </Grid>
                <Grid container md={12} direction="row" style={{marginTop:20}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> CONTACTO </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField fullWidth id="outlined-basic" label="" onChange={saveDemand} variant="outlined" name="contact" value={demandModel.contact} />
                    </Grid>
                </Grid>
                <Grid container md={12} direction="row" style={{marginTop:20,marginBottom:30}} alignItems="center">
                    <Grid item md={3} xs={4}> 
                        <Typography> TELÉFONO </Typography> 
                    </Grid>
                    <Grid item md={8} xs={8} direction="row">  
                        <TextField fullWidth id="outlined-basic" label="" onChange={saveDemand} variant="outlined" name="phone" value={demandModel.phone} />
                    </Grid>
                    
                </Grid>

                <Grid container md={12}  style={{marginTop:20,marginBottom:30,textAlign:"right"}} >
                    <Button onClick={sendClient} color="primary" style={{ color : "white"}} variant="contained">Guardar</Button>
                </Grid>
            </Grid>
        </Container>

    );
}

export default withRouter(Demand);