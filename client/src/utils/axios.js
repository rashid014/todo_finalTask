import axios from "axios";
let baseUrl='http://localhost:4000/'

const instance= axios.create({
    
    baseURL:baseUrl,
    
})


export default instance