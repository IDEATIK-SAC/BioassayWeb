import HttpClient from "../HttpClient";


const token_seguridad = window.localStorage.getItem("token_id");
const token_object = window.localStorage.getItem("token_employee");

 
export const loginUser = (model,dispatch) =>{
    
    return new Promise((resolve, reject) => {
        HttpClient.post('/Employee/Login' , model).then(response => {
            resolve(response);
            dispatch({
                type:"SESSION_START",
                session : response.data,
                authenticated : true
            })
            window.localStorage.setItem("token_id",response.data.id);
            window.localStorage.setItem("token_employee",JSON.stringify(response.data));
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const SaveEmployeer = (model) =>{
    return new Promise((resolve, reject) => {
        HttpClient.post('/Employee/Save' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const deleteEmployee = (model) =>{
    return new Promise((resolve, reject) => {
        HttpClient.post('/Employee/DeleteEmployee' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const getEmployeers =()=> {
   return new Promise((resolve, reject) => {
        HttpClient.get('/Employee/GetEmployees').then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const getEmployeeActually =(dispatch)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Employee/GetEmployeeById?id='+ token_seguridad).then(response => {
             resolve(response);
             
             dispatch({
                type:"SESSION_START",
                session : response.data,
                authenticated : true
            })          
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

export const getEmployeeById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/Employee/GetEmployeeById?id='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getEmployeeByType = (id) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.get('/Employee/GetEmployeeByType?id=' + id).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const getEmployeeAdviser = (id) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.get('/Employee/GetEmployeeAdviser').then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}
