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


