import Vue from 'vue';
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
});

http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if(err.response.data.message){
      Vue.prototype.$message({
        message: err.response.data.message,
        type: 'error'
      })
    }
    return Promise.reject(err);
  }
);

export default http;
