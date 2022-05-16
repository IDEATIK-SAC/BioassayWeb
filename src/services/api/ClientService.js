import HttpClient from "../HttpClient";
import axios from "axios";

export const saveClientServer = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/Client/SaveClient' , model).then(response => {
            resolve(response.data);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const deleteClientServer = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/Client/DeleteClient' , model).then(response => {
            resolve(response.data);
        }).catch(error => {
            resolve(error.response);
        })
    })
}


export const validateRUCClient = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/Client/ValidateRUCClient' , model).then(response => {
            resolve(response.data);
        }).catch(error => {
            resolve(error.response);
        })
    })
}


export const getClientById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Client/GetClientById?id='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getClientFull =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Client/GetClientFull').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }


 export const getClients =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Client/GetClients').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getRUC = (ruc)=>{
    return new Promise((resolve, reject) => {
        HttpClient.get('/Client/GetClientByRUC?id=' + ruc).then(response => {
            resolve(response.data);
        }).catch(error => {
            resolve(error.response);
        })
    })
 }


 export const getRUCSunat = (ruc)=>{
    return new Promise((resolve, reject) => {
        HttpClient.get('/Client/GetClientrucsunat?id=' + ruc).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
 }