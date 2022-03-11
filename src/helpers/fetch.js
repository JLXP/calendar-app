const baseUrl = process.env.REACT_APP_API_URL;

//Sin Token
const fetchSinToken = (endpoint,data, method = 'GET') =>{
    const url = `${baseUrl}/${endpoint}`;//localhost:4000/api/ el edpoint es auth
    //si el metodo es get retorna la misma ruta
    if(method==='GET'){
        return url;
    }else{
        //si no es get retorna, post, put y delete
        //url(localhost:4000/api/), method(POST, PUT; DELETE) y header(envia los tokens)
        //al final retorna un body
        return fetch(url,{
            method,
            headers:{
                'Content-type':'application/json'
            },
            //retorna la informacion
            body: JSON.stringify(data)
        })
    }
}


////Con Token
const fetchConToken = (endpoint,data, method = 'GET') =>{
    const url = `${baseUrl}/${endpoint}`;//localhost:4000/api/
    /*si no se envia de esta forma lo que puede pasar es
    que reviente la aplicacion
    */
    const token = localStorage.getItem('token')|| '';

    if(method==='GET'){
        return fetch(url, {
            method,
            headers:{
                'x-token':token
            }
        });
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-type':'application/json',
                'x-token':token
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    fetchSinToken,
    fetchConToken
}