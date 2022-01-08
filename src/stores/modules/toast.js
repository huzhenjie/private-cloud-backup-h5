const state = {
  show: false,
  msg: '',
  timeout: 4000,
  color: 'info',
  align: 'top'
}

const mutations = {
  SHOW_TOAST: (state, payload) => {
    const { msg, timeout, color, align } = payload
    state.msg = msg || ''
    state.timeout = timeout || 4000
    state.color = color || 'info'
    state.align = align || 'top'
    state.show = true
  }
}

const actions = {
  showToast({ commit }, payload) {
    commit('SHOW_TOAST', payload)
  },
  success({ dispatch }, msg) {
    return dispatch('showToast', { msg, color: 'success' })
  },
  error({ dispatch }, msg) {
    return dispatch('showToast', { msg, color: 'error' })
  },
  warning({ dispatch }, msg) {
    return dispatch('showToast', { msg, color: 'warning' })
  },
  info({ dispatch }, msg) {
    return dispatch('showToast', { msg, color: 'info' })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
