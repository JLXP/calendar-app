const baseUrl = process.env.REACT_APP_API_URL;

//Con Token 


//Sin Token
const fetchSinToken = (endpoint,data, method = 'GET') =>{
    const url = `${baseUrl}/${endpoint}`;//localhost:4000/api/

    if(method==='GET'){
        return url;
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    fetchSinToken
}