import axios from "axios";

/*
const http = () => {
    let axios2 = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        headers: {
            //"Content-type": "application/json",
            "Accept": "application/json"
        }
    });
    let token = localStorage.getItem('token');
    if (token != null) {
        axios2.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return axios2;

};
*/

const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            //"Content-type": "application/json",
            "Accept": "application/json"
        }
    });


export default http;

