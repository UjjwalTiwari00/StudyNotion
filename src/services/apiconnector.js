import axios from "axios";

export const axiosInstance=axios.create({});

export const apiConnector=(method,url,bodyData,headers,params)=>{
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData?bodyData:null,
        headers:headers?headers:null,
        params:params?params:null,
    })
}


//! Arguments:
// method: Specifies the HTTP method (e.g., GET, POST, PUT, DELETE, etc.).
// url: The endpoint URL for the request.
// bodyData: The request body data, usually for POST or PUT requests.
// headers: Optional HTTP headers for the request.
// params: Query parameters for the request.
//! Logic:
// axiosInstance is used to make an API call.
// The configuration object inside axiosInstance determines the HTTP request details:
// method: Sets the HTTP method.
// url: Specifies the API endpoint.
// data: Sends the request body (used in methods like POST or PUT).
// headers: Includes custom headers (e.g., authorization tokens).
// params: Adds query parameters to the URL.