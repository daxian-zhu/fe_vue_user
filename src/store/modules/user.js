import {
    TOKEN,
    TOKEN_EXP,
    getToken,
    setToken,
  } from '@/libs/auth';
  import {
    login,
    getUserInfo
  } from '@/api/user'
  
  const state = {
    token: getToken(TOKEN),
    name: '',
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    avatar: '',
    id: '',
  };
  
  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER_NAME: (state, name) => {
      state.name = name;
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    SET_AVATAR: (state, avatar = defaultAvatar) => {
      state.avatar = avatar;
    },
    SET_ID: (state, id) => {
      state.id = id;
    },
    setAccess (state, access) {
      state.access = access
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
  };
  
  const actions = {
  // 登录
  handleLogin ({ commit },userInfo) {
    const {
        username, password, client_id, client_secret,
      } = userInfo;
    const params = {
        username: username.trim(),
        password,
        client_id,
        client_secret,
      };
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        let data = res.data.data;
        commit('SET_TOKEN', data.access_token);
        setToken(TOKEN, `Bearer ${data.access_token}`);
        setToken(TOKEN_EXP, data.token_Expiration);
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
    // 得到用户信息
  getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          commit('SET_USER_NAME', res.data.baseUser.userName);
          sessionStorage.setItem('userinfo', JSON.stringify(res.data.baseUser));
          commit('SET_AVATAR', res.data.baseUser.headerUrl);
          commit('SET_ID', res.data.baseUser.id);
          commit('setHasGetInfo', true)
          commit('setAccess', res.data.access)
          commit('SET_USER_NAME', res.data.baseUser.userName);
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
  };
  