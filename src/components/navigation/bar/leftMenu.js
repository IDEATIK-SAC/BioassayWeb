import React from 'react';
import { ListItem, List, ListItemText, CardMedia } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import biossaylogo from '../../logo.jpeg';

export const LeftMenuBar = ({ classes, open, handleClick, closemenu,handleClickMaintenance,
    openOptions,handleClickReport,handleClickSurvey,openReport,openSurvey,sessionUser }) => (
     
    <div className={classes.list}>
        <List>
            <ListItem>
                <CardMedia
                    component="img"
                    alt="Biossay"
                    height="auto"
                    image={biossaylogo}
                />
            </ListItem>
        </List>
        <List>
            <ListItem component={Link} onClick={closemenu} button to="/dashboard">
                <i className="material-icons">home</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Inicio" />
            </ListItem>
            <ListItem button onClick={handleClick} >
                <i className="material-icons">assessment</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Solicitud" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
            { (sessionUser.user.userProfileId === 1 || sessionUser.user.userProfileId === 2) ? 
                 <List component="div" disablePadding> 
                      <ListItem component={Link} button to="/demand" onClick={closemenu}>
                               <ListItemText classes={{ primary: classes.listItemText }} primary="Realizar solicitud" />
                    </ListItem>
                           <ListItem component={Link} button to="/listdemand" onClick={closemenu} >
                               <ListItemText classes={{ primary: classes.listItemText }} primary="Solicitudes realizadas" />
                           </ListItem>
                       </List>    : (
                         null
                    )}
                
            </Collapse>
            <ListItem button onClick={handleClickReport} >
                <i className="material-icons">report</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Reporte" />
                {openReport ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openReport} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    { (sessionUser.user.userProfileId === 3 || sessionUser.user.userProfileId === 1) ? 
                            <ListItem component={Link} button to = "/report" onClick={closemenu} >
                                            <ListItemText classes={{ primary: classes.listItemText }} primary="Realizar Reporte" />
                            </ListItem>     : (
                         null
                    )}
                    { (sessionUser.user.userProfileId === 2 || sessionUser.user.userProfileId === 1) ? 
                        <ListItem component={Link} button to = "/listreport" onClick={closemenu} >
                        <ListItemText classes={{ primary: classes.listItemText }} primary="Reporte Realizado" />
                        </ListItem>     : (
                         null
                    )}
                               
                </List>
            </Collapse>
            <ListItem button onClick={handleClickSurvey} >
                <i className="material-icons">list_alt</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Encuestas" />
                {openSurvey ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSurvey} timeout="auto" unmountOnExit>
            { (sessionUser.user.userProfileId === 1 || sessionUser.user.userProfileId === 3 || sessionUser.user.userProfileId === 2) ? 
                         <List component="div" disablePadding>
                         <ListItem component={Link} button to = "/survey" onClick={closemenu} >
                             <ListItemText classes={{ primary: classes.listItemText }} primary="Realizar encuesta" />
                         </ListItem>
                         <ListItem component={Link} button to = "/listsurvey" onClick={closemenu} >
                             <ListItemText classes={{ primary: classes.listItemText }} primary="Encuestas realizadas" />
                         </ListItem>
                     </List> : (
                         null
                    )}
              
            </Collapse>
            <ListItem button onClick={handleClickMaintenance} >
                <i className="material-icons">settings</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Configuración" />
                {openOptions ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOptions} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                { (sessionUser.user.userProfileId === 1) ? 
                    <div>
                        <ListItem component={Link} button to = "/configuration" onClick={closemenu} >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Principal" />
                        </ListItem> 
                        <ListItem component={Link} button to = "/servicesconfig" onClick={closemenu} >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Lineas" />
                        </ListItem>
                        <ListItem component={Link} button to = "/branchconfig" onClick={closemenu} >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Marcas" />
                        </ListItem>
                        <ListItem component={Link} button to = "/modelconfig" onClick={closemenu} >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Modelos" />
                        </ListItem>
                        <ListItem component={Link} button to = "/listuser" onClick={closemenu} >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Usuarios" />
                        </ListItem>
                    </div> : (
                         null
                    )}
 
                    { (sessionUser.user.userProfileId === 4 || sessionUser.user.userProfileId === 1 ) ? 
                        <ListItem component={Link} button to = "/customers" onClick={closemenu}  >
                            <ListItemText classes={{ primary: classes.listItemText }} primary="Clientes" />
                        </ListItem> : (
                         null
                    )}
                    
                </List>
            </Collapse>
            <ListItem onClick={closemenu}>
                <i className="material-icons">cancel</i>
                <ListItemText classes={{ primary: classes.listItemText }} primary="Cerrar" />
            </ListItem>
        </List>
    </div>
);