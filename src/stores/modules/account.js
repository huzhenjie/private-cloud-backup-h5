import { login } from '@/apis/user'
import { getStorageStr, setStorageStr } from '@/utils/storage'

const state = {
  uid: getStorageStr('uid'),
  access_token: getStorageStr('access_token'),
  refresh_token: getStorageStr('refresh_token'),
  access_token_expire: getStorageStr('access_token_expire'),
  refresh_token_expire: getStorageStr('refresh_token_expire'),
  username: getStorageStr('username'),
  nick: getStorageStr('nick')
}

const mutations = {
  SET_TOKEN_INFO: (state, { uid, access_token, refresh_token, access_token_expire_in, refresh_token_expire_in }) => {
    const now = Date.now()
    state.uid = uid
    state.access_token = access_token
    state.refresh_token = refresh_token
    state.access_token_expire = now + access_token_expire_in
    state.refresh_token_expire = now + refresh_token_expire_in
    setStorageStr('uid', state.uid)
    setStorageStr('access_token', state.access_token)
    setStorageStr('refresh_token', state.refresh_token)
    setStorageStr('access_token_expire', state.access_token_expire)
    setStorageStr('refresh_token_expire', state.refresh_token_expire)
  },
  SET_ACCOUNT_INFO: (state, { username, nick }) => {
    state.username = username
    state.nick = nick
    setStorageStr('username', state.username)
    setStorageStr('nick', state.nick)
  }
}

const actions = {
  login({ commit, dispatch }, { username, pwd }) {
    return new Promise((resolve, reject) => {
      login({
        username,
        pwd
      }).then(res => {
        console.log(res)
        commit('SET_TOKEN_INFO', res.data.token_info)
        commit('SET_ACCOUNT_INFO', res.data.account_info)
        resolve(res)
      }).catch(e => reject(e))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
