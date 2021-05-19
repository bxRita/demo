import { ADD_DESIGN_CELL } from '../mutation-types'
const design = {
  namespaced: true,
  state: {
    // 设计界面JSON数据
    designCells: []
  },
  getters: {
    designCells: state => state.designCells
  },
  mutations: {
    [ADD_DESIGN_CELL]: (state, payload) => {
      state.designCells.push(payload)
    }
  },
  actions: {
    addCell({ commit }, payload) {
      commit(ADD_DESIGN_CELL, payload)
    }
  }
}

export default design
