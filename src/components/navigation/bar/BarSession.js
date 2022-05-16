import React, { useState , useEffect} from 'react';
import { Toolbar, IconButton, Typography, makeStyles, Button, Drawer } from "@material-ui/core";
import { LeftMenuBar } from './leftMenu';
import { withRouter } from "react-router-dom";
import { useStateValue } from "../../../context/store";
const useStyles = makeStyles((theme) => ({
    seccionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    seccionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    list: {
        width: 280,
        backgroundColor:"white",
        color:"#646464",
        height:"100%"
    },
    listBottom: {
        width: "100%"
    },
    listItemText: {
        fontSize: "16px",
        fontWeight: 600,
        paddingLeft: "20px",
    },
}))

const BarSession = (props) => {

    const classes = useStyles();
    const [openDrawLeft, setDrawLeft] = useState(false);
    const [open, setOpen] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openSurvey, setOpenSurvey] = useState(false);
    const [itemButtonBar, setButtonBar] = useState("");
    const [{ sessionUser }, dispatch] = useStateValue();

    useEffect(() => {
        selectButtonBar();
    }, [itemButtonBar])

    const selectButtonBar = () => {

    }
    
    const handleClick = () => {
        setOpen(!open);
    }
    const handleClickMaintenance = () => {
        setOpenOptions(!openOptions);
    }
    const handleClickReport = () => {
        setOpenReport(!openReport);
    }
    const handleClickSurvey = () => {
        setOpenSurvey(!openSurvey);
    }

    const closeDrawLeft = () => {
        setDrawLeft(false);
    }

    const openDraw = () => {
        setDrawLeft(true);
    }

    const closeSession = ()=>{
        window.localStorage.clear();
        dispatch({
            type:"SESSION_END",
            session : null,
            authenticated : false
        })
        props.history.push('/auth/login');
    }

    return (
        <React.Fragment>
            <Drawer
                open={openDrawLeft}
                close={closeDrawLeft}
                anchor="left">
                <div className={classes.list} >
                    <LeftMenuBar classes={classes} 
                                closemenu={closeDrawLeft} 
                                handleClick={handleClick} open={open}
                                handleClickMaintenance = {handleClickMaintenance} openOptions={openOptions} 
                                handleClickReport={handleClickReport} openReport={openReport}
                                handleClickSurvey={handleClickSurvey} openSurvey={openSurvey}
                                sessionUser = {sessionUser}
                                />
                </div>
            </Drawer>

            <Toolbar style={{ backgroundColor: "#022C3B", color: "white" }}>
                <IconButton color="inherit" onClick={openDraw}>  
                    <i className="material-icons">menu</i>
                </IconButton>
             
                <Typography variant="h6">
                    Bioassay
            </Typography>
                <div className={classes.grow}> </div>
                <div className={classes.seccionDesktop}>
                    <Button onClick={closeSession} color="inherit" >
                        Salir
                </Button>
                    <Button color="inherit">
                        {sessionUser.user.name}

                    </Button>
                </div>
                <div className={classes.seccionMobile}>
                    <IconButton color="inherit">
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>

            </Toolbar>
        </React.Fragment>

    );
};

export default withRouter(BarSession);