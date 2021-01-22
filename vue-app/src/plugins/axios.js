import Vue from "vue";
import router from "@/router/index.js";
import { userLogout } from "@/services/userService.js";

import axios from "axios";

axios.interceptors.response.use(
function(response) {
return response;
},
function(err) {
//Not getting status in error

if((err.response.status === 401 || err.response.status === 403)&&router.currentRoute.fullPath!=="/login"){
// userLogout();

router.push('/login')
}
return Promise.reject(err);
}
);

const instance = axios.create({
  baseURL:"http://localhost:3000"
});

Vue.use(instance);

export default axios;
