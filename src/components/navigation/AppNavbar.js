import React from 'react';
import { AppBar } from "@material-ui/core";
import BarSession from './bar/BarSession';
import { useStateValue } from '../../context/store';

const AppNavbar = () => {
    const [ {sessionUser} , dispatch] = useStateValue();
    
    return sessionUser ?
        (sessionUser.authenticated === true ? <AppBar position="static"><BarSession /></AppBar> : null)
        : null;
};

export default AppNavbar;