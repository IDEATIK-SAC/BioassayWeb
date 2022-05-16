import HttpClient from "../HttpClient";


export const saveRequestDocument = (model) =>{ 
    //model.clientID = clientid;
    console.log(model);
   return new Promise((resolve, reject) => {
       /*RequestDocument/SaveRequestDocument*/
        HttpClient.post('/RequestDocument/SaveRequestDocument' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    }) 
}

export const GetRequestsDocumentById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetRequestsDocumentById?requestid='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }



 export const GetCorrelative =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetCorrelative').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const GetRequestsDocuments =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetRequestsDocuments').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }