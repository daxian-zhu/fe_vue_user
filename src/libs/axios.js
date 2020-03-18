import axios from 'axios'
import {
  TOKEN,
  getToken,
} from '@/libs/auth';
import config from '@/config'
import qs from 'qs';
import {judgeEleExistInArray} from '@/libs/utils'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const uploadRequest = config.uploadFileRequest;

const formRequest = config.FormRequest;


class HttpRequest {
  constructor () {
    this.baseUrl = baseUrl
    console.log(this.baseUrl);
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        Authorization : getToken(TOKEN)
      }
    }
    return config
  }
  destroy (url) {

  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      config.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
      if (config.method.toLowerCase() === 'post') {
        if(judgeEleExistInArray(uploadRequest,url)){
          config.headers.post['Content-Type'] = 'multipart/form-data';
        }else if(judgeEleExistInArray(formRequest,url)){
          config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
          config.data = qs.stringify(config.data);
        }else{
          config.data = JSON.stringify(config.data);
        }
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response.data
      console.log(errorInfo);
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
