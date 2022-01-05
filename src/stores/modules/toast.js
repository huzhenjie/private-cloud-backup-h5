const state = {
  show: false,
  msg: '',
  timeout: 2000,
  color: '',
  align: 'top'
}

const mutations = {
  SHOW_TOAST: (state, payload) => {
    const { msg, timeout, color, align } = payload
    state.msg = msg || ''
    state.timeout = timeout || 2000
    state.color = color || ''
    state.align = align || 'top'
    state.show = true
  }
}

const actions = {
  showToast({ commit }, payload) {
    commit('SHOW_TOAST', payload)
  },
  success({ commit }, msg) {
    commit('SHOW_TOAST', {
      msg,
      timeout: 2000,
      color: 'success'
    })
  },
  error({ commit }, msg) {
    commit('SHOW_TOAST', {
      msg,
      timeout: 2000,
      color: 'error'
    })
  },
  warning({ commit }, msg) {
    commit('SHOW_TOAST', {
      msg,
      timeout: 2000,
      color: 'warning'
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
