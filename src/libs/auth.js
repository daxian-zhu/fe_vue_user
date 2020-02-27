import Cookies from 'js-cookie';

export const TOKEN = 'online-star';
export const TOKEN_EXP = 'online-star-exp';
export const CLIENT_ID = 'edu_pc_teach';
export const CLIENT_SECRET = 'weCode';

/**
 * 根据key获取token
 * @param {*} key
 */
export function getToken(key) {
  return Cookies.get(key);
}

/**
 * 根据key获取token的value
 * @param {*} key
 */
export function setToken(key, value) {
  return Cookies.set(key, value);
}

/**
 * 根据key移除token
 * @param {*} key
 */
export function removeToken(key) {
  return Cookies.remove(key);
}

/**
 * 存储所有token
 */
export function loginStore(data) {
  setToken(TOKEN, `Bearer ${data.access_token}`);
  setToken(TOKEN_EXP, data.token_Expiration);
}

/**
 * 移除所有token
 */
export function removeStore() {
  removeToken(TOKEN);
  removeToken(TOKEN_EXP);
  sessionStorage.clear();
}

/**
 * 判断Token是否过期
 * return true(没过期)/false(过期了)
 */
export function judgeTokenExp() {
  const token_exp = getToken(TOKEN_EXP);
  if (token_exp === 'undefined' || token_exp === undefined || token_exp === null || token_exp === '') {
    return false;
  }
  const expDate = new Date(token_exp);
  const nowDate = new Date();
  if (expDate <= nowDate) {
    return false;
  }
  return true;
}


