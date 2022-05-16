import HttpClient from "../HttpClient";

export const saveCompany = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/Company/SaveCompany' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const getCompanyById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Company/GetCompanyById?companyid='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }