import HttpClient from "../HttpClient";

export const saveBranch = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/SaveBranch' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const deleteBranch = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/DeleteBranch' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const saveLine = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/SaveLine' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const deleteLine = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/DeleteLine' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const deleteModel = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/DeleteModel' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const saveModelLine = (model) =>{ 
    return new Promise((resolve, reject) => {
        HttpClient.post('/RequestDocument/SaveModelLine' , model).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const getLineById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetLineById?lineid='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getLines =()=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetLines').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }


export const getBranchById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetBranchById?branchid='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getBranches =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetBranches').then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getBranchByLine =(lineid)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetBranchByLine?lineid='+lineid).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getModelLineById =(id)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetModelLineById?modelid='+ id).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }

 export const getModelLinesByBranch =(branchid)=> {
    return new Promise((resolve, reject) => {
         HttpClient.get('/RequestDocument/GetModelLinesByBranch?branchid='+branchid).then(response => {
             resolve(response);
         }).catch(error => {
             resolve(error.response);
         })
     })
 }
