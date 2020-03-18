import axios from '@/libs/api.request'
/**
 * 登录
 * @param {*} param0 
 */
export const login = ({ username, password,client_id,client_secret }) => {
  const data = {
    username,
    password,
    client_id,
    client_secret
  }
  return axios.request({
    url: 'auth/login',
    data,
    method: 'post'
  })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return axios.request({
      url: 'user',
      method: 'get'
    })
}
/**
 * 保存用户
 * @param {} data 
 */
export const saveUser = (data) => {
  return axios.request({
    url: 'user/user/save',
    data,
    method: 'post'
  })
}
/**
 * 用户列表
 * @param {} data 
 */
export const userList = (params) =>{
  return axios.request({
    url: 'user/user/list',
    params,
    method: 'get'
  })
}


