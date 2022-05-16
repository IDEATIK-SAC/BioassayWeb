import { CardMedia, Container,Grid, TextField, Typography,FormControlLabel,Checkbox, Button, Paper ,FormControl,Select,MenuItem,RadioGroup,Radio} from "@material-ui/core";
import React, { useState,useEffect } from "react";
import logo from "../logo.jpeg";
import { GetRequestsDocuments  } from "../../services/api/Demandservice";
import { SaveReport,GetReportById ,getRequestsDocumentReportById} from "../../services/api/ReportService";
import swal from 'sweetalert';

const Report =(props)=>{
    const { match} = props;
    const reportid = match.params.reportid;
    
const [ reportModel, setReportModel ] = useState({
    id:0, 
    lastRevision:'0001-01-01T00:00:00.0000000',
    serviceTypeId : '',
    team:'',
    serialNumber:'',
    requestId:0,
    finding:'',
    procedureReport:'',
    possibleCauses:'',
    recommendations:'',
    observations:'',
    statusReporteId:'',
    idOperativity : '',
    model:'',
    razonSocial:'',
    address:'',
    clientID: 0
})    

const [ typeServices, setTypeServices ] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
        checkedG: false,
        checkedH: false,
        checkedI: false,
        checkedJ: false,
        checkedK: false,
        checkedL: false,
        checkedM: false,
        checkedN: false,
        checkedO: false,
        checkedP: false,
        checkedQ: false,
        checkedR: false,
        checkedS: false
});

const [ typeFinding, setTypeFinding ] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
    checked11: false,
    checked12: false,
    checked13: false,
    checked14: false,
    checked15: false,
    checked16: false,
    checked17: false,
    checked18: false,
    checked19: false,
    checked20: false,
    checked21: false,
    checked22: false,
    checked23: false,
    checked24: false,
    checked25: false,
    checked26: false,
    checked27: false,
    checked28: false,
    checked29: false,
    checked30: false,
    checked31: false,
    checked32: false,
    checked33: false,
    checked34: false,
    checked35: false,
    checked36: false,
    checked37: false,
    checked38: false,
    checked39: false,
    checked40: false,
    checked41: false,
    checked42: false,
    checked43: false,
    checked44: false,
    checked45: false,
    checked46: false,
    checked47: false,
    checked48: false,
    checked49: false,
    checked50: false,
    checked51: false,
    checked52: false,
    checked53: false,
    checked54: false,
    checked55: false,
    checked56: false,
    checked57: false,
    checked58: false,
    checked59: false,
    checked60: false,
    checked61: false,
    checked62: false,
    checked63: false,
    checked64: false,
    checked65: false,
    checked66: false,
    checked67: false
});


const [ typeProcess, setTypeProcess ] = useState({
    checked1: ''
});

const [ typeCauses, setTypeCauses ] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
    checked11: false,
    checked12: false,
    checked13: false,
    checked14: false,
    checked15: false,
    checked16: false,
    checked17: false,
    checked18: false,
    checked19: false,
    checked20: false,
    checked21: false,
    checked22: false
});

const [ typeRecommendations, setTypeRecommendations ] = useState({
    checked1: ''
});

const [ typeObservation, setTypeObservation ] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    checked9: false,
    checked10: false,
    checked11: false,
    checked12: false,
    checked13: false,
    checked14: false,
    checked15: false,
    checked16: false,
    checked17: false,
    checked18: false,
    checked19: false,
    checked20: false,
    checked21: false,
    checked22: false
});

 
const [ documents, setDocuments] = useState([]);


useEffect(() => {
    getAllDocuments();
    if(typeof(reportid) !== 'undefined'){
        GetReportById(reportid).then(response =>{
            
            setReportModel(response.data);
            var services = JSON.parse(response.data.serviceTypeId);
            setTypeServices({
                checkedA : services.checkedA,
                checkedB : services.checkedB,
                checkedC : services.checkedC,
                checkedD : services.checkedD,
                checkedE : services.checkedE,
                checkedF : services.checkedF,
                checkedG : services.checkedG,
                checkedH : services.checkedH,
                checkedI : services.checkedI,
                checkedJ : services.checkedJ,
                checkedK : services.checkedK,
                checkedL : services.checkedL,
                checkedM : services.checkedM,
                checkedN : services.checkedN,
                checkedO : services.checkedO,
                checkedP : services.checkedP
            });
            var finding = JSON.parse(response.data.finding);

            setTypeFinding({
                checked1: finding.checked1,
                checked2: finding.checked2,
                checked3: finding.checked3,
                checked4: finding.checked4,
                checked5: finding.checked5,
                checked6: finding.checked6,
                checked7: finding.checked7,
                checked8: finding.checked8,
                checked9: finding.checked9,
                checked10: finding.checked10,
                checked11: finding.checked11,
                checked12: finding.checked12,
                checked13: finding.checked13,
                checked14: finding.checked14,
                checked15: finding.checked15,
                checked16: finding.checked16,
                checked17: finding.checked17,
                checked18: finding.checked18,
                checked19: finding.checked19,
                checked20: finding.checked20,
                checked21: finding.checked21,
                checked22: finding.checked22,
                checked23: finding.checked23,
                checked24: finding.checked24,
                checked25: finding.checked25,
                checked26: finding.checked26,
                checked27: finding.checked27,
                checked28: finding.checked28,
                checked29: finding.checked29,
                checked30: finding.checked30,
                checked31: finding.checked31,
                checked32: finding.checked32,
                checked33: finding.checked33,
                checked34: finding.checked34,
                checked35: finding.checked35,
                checked36: finding.checked36,
                checked37: finding.checked37,
                checked38: finding.checked38,
                checked39: finding.checked39,
                checked40: finding.checked40,
                checked41: finding.checked41,
                checked42: finding.checked42,
                checked43: finding.checked43,
                checked44: finding.checked44,
                checked45: finding.checked45,
                checked46: finding.checked46,
                checked47: finding.checked47,
                checked48: finding.checked48,
                checked49: finding.checked49,
                checked50: finding.checked50,
                checked51: finding.checked51,
                checked52: finding.checked52,
                checked53: finding.checked53,
                checked54: finding.checked54,
                checked55: finding.checked55,
                checked56: finding.checked56,
                checked57: finding.checked57,
                checked58: finding.checked58,
                checked59: finding.checked59,
                checked60: finding.checked60,
                checked61: finding.checked61,
                checked62: finding.checked62,
                checked63: finding.checked63,
                checked64: finding.checked64,
                checked65: finding.checked65,
                checked66: finding.checked66
            });

            var procedureReport = JSON.parse(response.data.procedureReport);
            setTypeProcess({
                checked1: procedureReport.checked1,
                checked2: procedureReport.checked2,
                checked3: procedureReport.checked3,
                checked4: procedureReport.checked4,
                checked5: procedureReport.checked5,
                checked6: procedureReport.checked6,
                checked7: procedureReport.checked7,
                checked8: procedureReport.checked8,
                checked9: procedureReport.checked9,
                checked10: procedureReport.checked10,
                checked11: procedureReport.checked11,
                checked12: procedureReport.checked12,
                checked13: procedureReport.checked13,
                checked14: procedureReport.checked14,
                checked15: procedureReport.checked15,
                checked16: procedureReport.checked16,
                checked17: procedureReport.checked17,
                checked18: procedureReport.checked18,
                checked19: procedureReport.checked19,
                checked20: procedureReport.checked20,
                checked21: procedureReport.checked21,
                checked22: procedureReport.checked22,
                checked23: procedureReport.checked23,
                checked24: procedureReport.checked24,
                checked25: procedureReport.checked25,
                checked26: procedureReport.checked26,
                checked27: procedureReport.checked27,
                checked28: procedureReport.checked28,
                checked29: procedureReport.checked29,
                checked30: procedureReport.checked30,
                checked31: procedureReport.checked31,
                checked32: procedureReport.checked32,
                checked33: procedureReport.checked33,
                checked34: procedureReport.checked34,
                checked35: procedureReport.checked35,
                checked36: procedureReport.checked36,
                checked37: procedureReport.checked37,
                checked38: procedureReport.checked38,
                checked39: procedureReport.checked39,
                checked40: procedureReport.checked40,
                checked41: procedureReport.checked41,
                checked42: procedureReport.checked42,
                checked43: procedureReport.checked43,
                checked44: procedureReport.checked44,
                checked45: procedureReport.checked45,
                checked46: procedureReport.checked46,
                checked47: procedureReport.checked47,
                checked48: procedureReport.checked48,
                checked49: procedureReport.checked49,
                checked50: procedureReport.checked50,
                checked51: procedureReport.checked51,
                checked52: procedureReport.checked52,
                checked53: procedureReport.checked53,
                checked54: procedureReport.checked54,
                checked55: procedureReport.checked55,
                checked56: procedureReport.checked56,
                checked57: procedureReport.checked57,
                checked58: procedureReport.checked58,
                checked59: procedureReport.checked59,
                checked60: procedureReport.checked60,
                checked61: procedureReport.checked61,
                checked62: procedureReport.checked62,
                checked63: procedureReport.checked63,
                checked64: procedureReport.checked64,
                checked65: procedureReport.checked65,
                checked66: procedureReport.checked66,
                checked67: procedureReport.checked66,
                checked68: procedureReport.checked68,
                checked69: procedureReport.checked69,
            });

            var possibleCauses = JSON.parse(response.data.possibleCauses);
            setTypeCauses({
                checked1: possibleCauses.checked1,
                checked2: possibleCauses.checked2,
                checked3: possibleCauses.checked3,
                checked4: possibleCauses.checked4,
                checked5: possibleCauses.checked5,
                checked6: possibleCauses.checked6,
                checked7: possibleCauses.checked7,
                checked8: possibleCauses.checked8,
                checked9: possibleCauses.checked9,
                checked10: possibleCauses.checked10,
                checked11: possibleCauses.checked11,
                checked12: possibleCauses.checked12,
                checked13: possibleCauses.checked13,
                checked14: possibleCauses.checked14,
                checked15: possibleCauses.checked15,
                checked16: possibleCauses.checked16,
                checked17: possibleCauses.checked17,
                checked18: possibleCauses.checked18,
                checked19: possibleCauses.checked19,
                checked20: possibleCauses.checked20,
                checked21: possibleCauses.checked21,
                checked22: possibleCauses.checked22
            });
            var recommendations = JSON.parse(response.data.recommendations);
            setTypeRecommendations({
                checked1: recommendations.checked1,
                checked2: recommendations.checked2,
                checked3: recommendations.checked3,
                checked4: recommendations.checked4,
                checked5: recommendations.checked5,
                checked6: recommendations.checked6,
                checked7: recommendations.checked7,
                checked8: recommendations.checked8,
                checked9: recommendations.checked9,
                checked10: recommendations.checked10,
                checked11: recommendations.checked11,
                checked12: recommendations.checked12,
                checked13: recommendations.checked13,
                checked14: recommendations.checked14,
                checked15: recommendations.checked15,
                checked16: recommendations.checked16,
                checked17: recommendations.checked17,
                checked18: recommendations.checked18,
                checked19: recommendations.checked19,
                checked20: recommendations.checked20,
                checked21: recommendations.checked21,
                checked22: recommendations.checked22,
                checked23: recommendations.checked23,
                checked24: recommendations.checked24,
                checked25: recommendations.checked25
            });
            var observations = JSON.parse(response.data.observations);
            setTypeObservation({
                checked1: observations.checked1,
                checked2: observations.checked2,
                checked3: observations.checked3,
                checked4: observations.checked4,
                checked5: observations.checked5,
                checked6: observations.checked6,
                checked7: observations.checked7,
                checked8: observations.checked8,
                checked9: observations.checked9,
                checked10: observations.checked10,
                checked11: observations.checked11,
                checked12: observations.checked12,
                checked13: observations.checked13,
                checked14: observations.checked14,
                checked15: observations.checked15,
                checked16: observations.checked16,
                checked17: observations.checked17
            });
        });
    }     
}, [reportid])

const handleTypeServices = (e) => {
    setTypeServices({ ...typeServices, [e.target.name]: e.target.checked });
  };
const handleTypeFinding = (e) => {
    setTypeFinding({ ...typeFinding, [e.target.name]: e.target.checked });
};

const handleTypeProcess = (e) => {
    setTypeProcess({ ...typeProcess, [e.target.name]: e.target.value });
};

const handleTypeCauses = (e) => {
    setTypeCauses({ ...typeCauses, [e.target.name]: e.target.checked });
};

const handleTypeRecommendations = (e) => {
    setTypeRecommendations({ ...typeRecommendations, [e.target.name]: e.target.value });
};

const handleTypeObservation = (e) => {
    setTypeObservation({ ...typeObservation, [e.target.name]: e.target.checked });
};
 
const getAllDocuments = ()=>{
    GetRequestsDocuments().then(response =>{
        
        setDocuments(response.data);
    });
}

const saveReportLocal = (e) =>{
    const { name, value} = e.target;
    setReportModel(last => 
        ({...last,
            [name]:value
        }))
}



const sendReportService = (e)=>{
     console.log("reportModel", reportModel);
    SaveReport(reportModel,typeServices,typeFinding,typeProcess,typeCauses, typeRecommendations, typeObservation).then(response =>{
        if(response.data){
            swal("Buen trabajo!", "El reporte a sido guardado", "success")
              .then(() => {
                props.history.push('/listreport');
              });
        }
    });
} 

const getInfoCustomer = ()=>{
    getRequestsDocumentReportById(reportModel.requestId).then(response => {
        console.log(response);
        if(response.data != null){
            setReportModel((last) =>({
                ...last,
                razonSocial : response.data.nameClient,
                address : response.data.adreess,
                clientID : response.data.clientId,
                team :response.data.team,
                model : response.data.model
            }))
        }
    }) 
}



    return(
        <Container>
            <Grid container spacing={2}>
                <Grid item md={12}>
                <CardMedia
                    style={{height: 200, width: "50%"}}
                    component="img"
                    alt="Biossay"
                    height="auto"
                    image={logo}
                />
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h5">REPORTE DE POST VENTA</Typography>
                </Grid>
                
                <Grid item md={12}>
                    <Typography>INFORMACIÓN DEL CLIENTE</Typography>
                </Grid>
                <Grid item md={6}>
                <FormControl fullWidth variant="outlined"  > 
                        <Select
                        fullWidth
                        name="requestId"
                        value={reportModel.requestId}
                        onChange={saveReportLocal}
                        onBlur={getInfoCustomer}
                        >
                        <MenuItem value="0">
                            <em>Seleccione una solicitud </em>
                        </MenuItem>
                        {(documents.map((n) => 
                          <MenuItem key={n.id} value={n.id}>{n.fEmision} {n.nameClient}</MenuItem>
                        ))}
                        </Select>
                    
                    </FormControl>
                </Grid>
                <Grid item md={6}>
                    <TextField variant="outlined" onChange={saveReportLocal} value={reportModel.razonSocial} disabled={true} name="razonSocial" label="Razón Social"  fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField variant="outlined" onChange={saveReportLocal} value={reportModel.team} disabled={true} name="team" label="Equipo" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField variant="outlined" onChange={saveReportLocal} value={reportModel.address} disabled={true} name="address" label="Dirección" fullWidth />
                </Grid>
                <Grid item md={6}>
                    <TextField variant="outlined" onChange={saveReportLocal} value={reportModel.model} disabled={true} name="model" label="Modelo" fullWidth />
                
                </Grid>
                <Grid item md={6}>
                    <TextField variant="outlined" id="lasrevision" onChange={saveReportLocal} value={reportModel.lastRevision} name="lastRevision" label="Ultima revisión" focused  type="datetime-local" fullWidth />
                 
                </Grid>
                
                <Grid item md={6}>
                    <TextField variant="outlined" onChange={saveReportLocal} value={reportModel.serialNumber} name="serialNumber" label="Nº Serie" fullWidth />
                </Grid>
                <Grid item md={12}>
                    <Typography>TIPO DE SERVICIO</Typography>
                </Grid>
                <Paper style={{width:"100%", padding:20}}  > 
                    <Grid container>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedA" checked={ typeServices.checkedA } />} label="SEGUIMIENTO DE EQUIPO" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedB" checked={ typeServices.checkedB } />} label="MANTENIMIENTO PREVENTIVO" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedC" checked={ typeServices.checkedC } />} label="MANTENIMIENTO CORRECTIVO" labelPlacement="end" /> </Grid> 
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedF" checked={ typeServices.checkedF } />}  label="ASESORIA CIENTIFICA" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedG" checked={ typeServices.checkedG } />}  label="CAPACITACIÓN" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedH" checked={ typeServices.checkedH } />}  label="INSTALACIÓN" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedI" checked={ typeServices.checkedI } />} label="CALIBRACIÓN" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedJ" checked={ typeServices.checkedJ } />}  label="RETIRO DE EQUIPO" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedK" checked={ typeServices.checkedK } />} label="DIAGNOSTICO DE EQUIPO" labelPlacement="end" /> </Grid>
                        <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeServices}  name="checkedL" checked={ typeServices.checkedL } />}  label="OTROS" labelPlacement="end" /> </Grid> 
                        </Grid>
                </Paper>
                
                <Grid item md={12}>
                     <Typography>HALLAZGO</Typography> 
                </Grid>
                <Paper style={{width:"100%", padding:20}} > 
                    <Grid container> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked1" checked={ typeFinding.checked1 }  />} label="ERROR DE  DE SOFTWARE"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked2" checked={ typeFinding.checked2 }  />} label="ALARMA DE MUESTRA ESCASA(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked3" checked={ typeFinding.checked3 }   />} label="PROBLEMAS DE LECTURA WBC(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked4" checked={ typeFinding.checked4 }  />} label="PROBLEMAS DE LECTURA RBC(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked67" checked={ typeFinding.checked67 }  />} label="PROBLEMAS DE LECTURA DE PLAQUETAS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked5" checked={ typeFinding.checked5 }  />} label="NO HAY RELACION HB/HTO(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked6" checked={ typeFinding.checked6 }  />} label="EQUIPO DESCALIBRADO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked7" checked={ typeFinding.checked7 }  />} label="ERROR EN VALVULAS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked8" checked={ typeFinding.checked8 }  />} label="EQUIPO DESCALIBRADO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked9" checked={ typeFinding.checked9 }  />} label="CAMARA WBC DAÑADA(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked10" checked={ typeFinding.checked10 }  />} label="CAMARA RBC DAÑADA(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked11" checked={ typeFinding.checked11 }  />} label="ERROR DE MOTOR EN EJE X O Y (H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked12" checked={ typeFinding.checked12 }   />} label="ERROR DE VOLTAGE DE HB(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked13" checked={ typeFinding.checked13 }  />} label="ERROR EN AGUJA DE MUESTRA/REACTIVO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked14" checked={ typeFinding.checked14 }  />} label="ERROR EN TARJETA DE CONTROL(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked15" checked={ typeFinding.checked15 }  />} label="ERROR EN TARJETA DE CONTROL DE DIFERENCIACION(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked16" checked={ typeFinding.checked16 }  />} label="ERROR EN LAVADO DE CUBETAS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked17" checked={ typeFinding.checked17 }  />} label="LAMPARA INESTABLE(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked18" checked={ typeFinding.checked18 }  />} label="ERROR DE TEMPERATURA(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked19" checked={ typeFinding.checked19 }  />} label="EQUIPO  SIN USAR MAS DE UN MES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked20" checked={ typeFinding.checked20 }  />} label="NO HAY CONEXIÓN ENTRE EL EQUIPO Y PC(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked21" checked={ typeFinding.checked21 }  />} label="PROBLEMA DE AIRE EN MANGUERAS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked22" checked={ typeFinding.checked22 } />} label="LECTURAS DE BACKGROUND FUERA DE RANGO(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked23" checked={ typeFinding.checked23 } />} label="NUEVO LOTE CONTROLES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked24" checked={ typeFinding.checked24 } />} label="CONFIGURACION DE PRUEBAS (B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked25" checked={ typeFinding.checked25 } />} label="GANANCIAS BAJAS DE FILTROS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked26" checked={ typeFinding.checked26 } />} label="ERROR EN LAVADD DE CUBETAS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked27" checked={ typeFinding.checked27 } />} label="ERROR EN EL SENSOR DE LIQUIDOS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked28" checked={ typeFinding.checked28 } />} label="CAMARA WBC OBSTRUIDA/SUCIA(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked29" checked={ typeFinding.checked29 } />} label="LAMPARA INESTABLE(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked30" checked={ typeFinding.checked30 } />} label="ERROR DE TEMPERATURA(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked31" checked={ typeFinding.checked31 } />} label="EQUIPO ROTO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked32" checked={ typeFinding.checked32 } />} label="EQUIPO  SIN USAR MAS DE UN MES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked33" checked={ typeFinding.checked33 } />} label="NO HAY CONEXIÓN ENTRE EL EQUIPO Y PC(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked34" checked={ typeFinding.checked34 } />} label="PROBLEMA DE AIRE EN MANGUERAS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked35" checked={ typeFinding.checked35 } />} label="LECTURAS DE BACKGROUND FUERA DE RANGO(H)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked36" checked={ typeFinding.checked36 } />} label=" NUEVO LOTE CONTROLES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked37" checked={ typeFinding.checked37 } />} label="ERROR DE BLANK CELL(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked38" checked={ typeFinding.checked38 } />} label="ALARMA DE VOLUMEN (B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked39" checked={ typeFinding.checked39 } />} label="CONFIGURACION DE PRUEBAS (B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked40" checked={ typeFinding.checked40 } />} label="GANANCIAS BAJAS DE FILTROS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked41" checked={ typeFinding.checked41 } />} label="ERROR EN TEST DE CUBETAS(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked42" checked={ typeFinding.checked42 } />} label="ERROR EN EL SENSOR DE LIQUIDOS(B)"labelPlacement="end" /> </Grid>
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked43" checked={ typeFinding.checked43 } />} label="LAMPARA QUEMADA(B)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked44" checked={ typeFinding.checked44 } />} label="EL EQUIPO NO ASPIRA MUESTRA"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked45" checked={ typeFinding.checked45 } />} label="EL EQUIPO NO ENCIENDE"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked47" checked={ typeFinding.checked47 } />} label="NO HAY REPETIBILIDAD DE RESULTADOS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked50" checked={ typeFinding.checked50 } />} label="PIPETAS DESCALIBRADAS(A)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked51" checked={ typeFinding.checked51 } />} label="MICRO/CENTRIFUGAS EN MAL ESTADO(A)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked52" checked={ typeFinding.checked52 } />} label="BAÑO MARIA INOPERATIVO(A)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked53" checked={ typeFinding.checked53 } />} label="EQUIPO NO DESTILA(A)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked54" checked={ typeFinding.checked54 } />} label="EQUIPO NO LAVA ADECUADAMENTE(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked56" checked={ typeFinding.checked56 } />} label="INGRESO DE CONFIGURACION DE ELISAS(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked57" checked={ typeFinding.checked57 } />} label="PROBLEMA DE LAMPARA DE LECTOR(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked58" checked={ typeFinding.checked58 } />} label="NO HAY REPETIBILIDAD  DE ABSORBANCIAS(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked59" checked={ typeFinding.checked59 } />} label="NO RECONOCE CALIBRADOR(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked60" checked={ typeFinding.checked60 } />} label="EQUIPO NO LAVA PLACA CORRECTAMENTE(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked61" checked={ typeFinding.checked61 } />} label="LECTOR SIN CALIBRACION(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked62" checked={ typeFinding.checked62 } />} label="LAVADOR DE ELISA DESCONFIGURADO(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked63" checked={ typeFinding.checked63 } />} label="EQUIPO NO LEE PRUEBA RAPIDA(I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked65" checked={ typeFinding.checked65 } />} label="MALA PREPARACION DE REACTIVOS (I)"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox color="primary" onChange={handleTypeFinding}  name="checked66" checked={ typeFinding.checked66 } />} label="OTROS"labelPlacement="end" /> </Grid> 

                    </Grid>
                </Paper>
                
                <Grid item md={12}>
                     <Typography>PROCEDIMIENTO</Typography> 
                </Grid>
                <Paper style={{width:"100%", padding:20}}  > 
                    <Grid container>
                            <Grid item md={12}><TextField variant="outlined" onChange={handleTypeProcess} value={typeProcess.checked1} multiline rows={5}  name="checked1" label=""  fullWidth /> </Grid> 
                    </Grid>
                </Paper>
                <Grid item md={12}>
                     <Typography>POSIBLES CAUSAS</Typography> 
                     
                </Grid>
                <Paper style={{width:"100%", padding:20}} >
                    <Grid container>
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked1" checked={ typeCauses.checked1 } color="primary" />} label="MANEJO INADECUADO DE SOFTWARE"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked2" checked={ typeCauses.checked2 } color="primary" />} label="NO SE RERALIZA EL MANTENIMIENTO DIARIO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked3" checked={ typeCauses.checked3 } color="primary" />} label="CONEXIONES ELECTRICAS INADECUADAS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked8" checked={ typeCauses.checked8 } color="primary" />} label="CONTROLES VENCIDOS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked9" checked={ typeCauses.checked9 } color="primary" />} label="MALA CONSERVACION DE REACTIVOS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked10" checked={ typeCauses.checked10 } color="primary" />} label="MALA CONSERVACION DE CONTROLES / CALIBRADORES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked12" checked={ typeCauses.checked12 } color="primary" />} label="USO DE REACTIVOS VENCIDOS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked13" checked={ typeCauses.checked13 } color="primary" />} label="MALA CALIBRACION"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked14" checked={ typeCauses.checked14 } color="primary" />} label="APAGADO INTEMPESTIVAMENTE"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked16" checked={ typeCauses.checked16 } color="primary" />} label="NO REALIZA  MANTENIMIENTO PREVENTIVO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked17" checked={ typeCauses.checked17 } color="primary" />} label="PASO DE MUESTRA COAGULADA "labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked18" checked={ typeCauses.checked18 } color="primary" />} label="USO DE REACTIVOS NO COMPATIBLES"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked19" checked={ typeCauses.checked19 } color="primary" />} label="CONTAMINACION DE REACTIVOS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked20" checked={ typeCauses.checked20 } color="primary" />} label="COLISION DE AGUJA"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked21" checked={ typeCauses.checked21 } color="primary" />} label="ERROR PROCIDEMENTAL"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeCauses}  name="checked22" checked={ typeCauses.checked22 } color="primary" />} label="OTROS"labelPlacement="end" /> </Grid> 
                    </Grid>
                </Paper>
                <Grid item md={12}>
                     <Typography>RECOMENDACIONES</Typography> 
                </Grid>
                <Paper style={{width:"100%", padding:20}} >
                    <Grid container>
                        <Grid item md={12}><TextField variant="outlined" onChange={handleTypeRecommendations} value={typeRecommendations.checked1} multiline rows={5}  name="checked1" label=""  fullWidth /> </Grid> 
                    </Grid>
                </Paper>
                <Grid item md={12}>
                     <Typography>OBSERVACIONES</Typography> 
                   
                </Grid>
                <Paper style={{width:"100%", padding:20}} >
                    <Grid container>
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked1" checked={ typeObservation.checked1 }  color="primary" />} label="NINGUNA"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked2" checked={ typeObservation.checked2 }  color="primary" />} label="INGRESO DE PERSONAL NUEVO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked5" checked={ typeObservation.checked5 }  color="primary" />} label="NO USA CONTROL"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked6" checked={ typeObservation.checked6 }  color="primary" />} label="NO USA CALIBRADOR"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked7" checked={ typeObservation.checked7 }  color="primary" />} label="LABORATORIO EN  CRECIMIENTO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked9" checked={ typeObservation.checked9 }  color="primary" />} label="CONDICIONES ELECTRICAS INADECUADAS"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked10" checked={ typeObservation.checked10 }  color="primary" />} label="NO USA POZO A TIERRA"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked11" checked={ typeObservation.checked11 }  color="primary" />} label="CLIENTE USA REACTIVOS DE OTRO PROVEEDOR"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked12" checked={ typeObservation.checked12 }  color="primary" />} label="CLIENTE INTERESADO EN EQUIPO NUEVO"labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked13" checked={ typeObservation.checked13 }  color="primary" />} label="CLIENTE REFIERE MALA ATENCION "labelPlacement="end" /> </Grid> 
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked14" checked={ typeObservation.checked14 }  color="primary" />} label="CLIENTE NO DISPONE DE TIEMPO PARA ATENCION"labelPlacement="end" /> </Grid>
                    <Grid item md={4}><FormControlLabel control={<Checkbox onChange={handleTypeObservation}  name="checked17" checked={ typeObservation.checked17 }  color="primary" />} label="OTROS"labelPlacement="end" /> </Grid> 
                    </Grid>
                </Paper>
                <Grid item md={12}>
                     <Typography>OPERATIVIDAD</Typography> 
                     <Typography>El equipo queda en las siguientes condiciones:</Typography>
                </Grid>

                <Paper style={{width:"100%", padding:20}} >
                    <Grid container>
                        <Grid item md={12}><FormControlLabel control={
                            <RadioGroup row aria-label="position" name="IdOperativity" value={reportModel.idOperativity} onChange={(e) => {
                                setReportModel({...reportModel,IdOperativity : e.target.value})
                            }}>
                           <FormControlLabel value="1" control={<Radio color="primary" />} label="OPERATIVO" />
                           <FormControlLabel value="2" control={<Radio color="primary" />} label="NO OPERATIVO" />
                            <FormControlLabel value="3" control={<Radio color="primary" />} label="EN SEGUIMIENTO" />
                         </RadioGroup>
                        } /> 
                    </Grid> 
                    </Grid>
                </Paper> 


                <Grid item md={12}>
                     <Typography>ESTADO</Typography>  
                </Grid>
                <Paper style={{width:"100%", padding:20}} >
                    <Grid container>
                        <Grid item md={12}><FormControlLabel control={
                            <RadioGroup row aria-label="position" name="StatusReporteId" value={reportModel.statusReporteId} onChange={(e) => {
                                setReportModel({...reportModel,StatusReporteId : e.target.value})
                            }}>
                           <FormControlLabel value="1" control={<Radio color="primary" />} label="FINALIZADO" />
                           <FormControlLabel value="2" control={<Radio color="primary" />} label="NO FINALIZADO" />
                            <FormControlLabel value="3" control={<Radio color="primary" />} label="EN ESPERA" />
                         </RadioGroup>
                        } /> 
                    </Grid> 
                    </Grid>
                </Paper> 

                <Grid item md={12}>
                    <Button variant="contained" onClick={sendReportService} style={{color:"white"}} color="primary">
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Report;