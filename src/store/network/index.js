import axios from "axios";
import config from "../../Config";

const defaultHeader = {
    'content-type': 'application/json',
    "Accept": "application/json",
};

export default ({method = "GET", headers = defaultHeader, url = config.NETWORK_URL, uri = "", params, body}) => {
    let obj = {
        method,
        url: url + uri + `?api_key=${config.API_KEY}`,
        headers,
        withCredentials: true
    }

    // check for params is object
    if(params === Object(params)){
        for(let key in params){
            // append the parameters in url as  aquery parameter
            obj.url+= `&&${key}=${params[key]}`;
        }
    } 

    let xhr = new XMLHttpRequest();
    xhr.open(method, obj.url);
    xhr.send();
    return new Promise(async (resolve, reject) => {
        xhr.onload = function() {
            console.log("xhr :-",xhr);
            if (xhr.status != 200) { // analyze HTTP status of the response
                console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
                return reject(xhr.status)
            } else { // show the result
                return resolve(xhr.response)
            }
        };
    })
    // return axios(obj).then(result => {
    //     console.log("axios result-->>",result)
    //     return result;
    // }).catch(err => {
    //     console.log("error in network call", err);
    //     throw err;
    // });
}