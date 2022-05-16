import HttpClient from "../HttpClient";

export const SaveReport = (model,service,finding,process,causes,recommendations,observations) =>{

    
    model.ServiceTypeId = JSON.stringify(service);
    model.Finding = JSON.stringify(finding);
    model.ProcedureReport = JSON.stringify(process);
    model.PossibleCauses = JSON.stringify(causes);
    model.Recommendations = JSON.stringify(recommendations);
    model.Observations = JSON.stringify(observations);
    
    console.log(model);
    return new Promise((resolve, reject) => {
        HttpClient.post('/Report/SaveReport' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}


export const getRequestsDocumentReportById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetRequestsDocumentReportById?id='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

export const getCustomerByRequestId =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetCustomerByRequestId?id='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

export const GetReports =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Report/GetReports').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const GetReportById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Report/GetReportById?id=' + id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getReportsFull =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Report/GetReportsFull').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }