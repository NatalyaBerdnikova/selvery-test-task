const STORAGE_KEY = 'computed_values';
const DEFAULT_VARIABLE_OBJECT = { name: '', type: null, formula: '' };

export const state = () => ({
  lastAddedIndex: 0,
  variables: []
})

export const getters = {
  getVariables(state) {
    return state.variables;
  }
}

export const mutations = {
  setVariables(state, variables) {
    state.variables = variables;
  },
  addVariable(state) {
    state.lastAddedIndex += 1;
    state.variables.push({ id: state.lastAddedIndex, ...DEFAULT_VARIABLE_OBJECT });
  },
  changeVariable(state, data) {
    const index = state.variables.findIndex((el) => el.id === data.id);
    state.variables[index] = { ...state.variables[index], ...data };
  },
  removeVariable(state, idToRemove) {
    state.variables = state.variables.filter(({ id }) => id !== idToRemove);
  },
}

export const actions = {
  setFromStorage({ commit }) {
    const variables = localStorage.getItem(STORAGE_KEY);
    if (!variables) {
      return;
    }
    commit('setVariables', JSON.parse(variables));
  },
  saveToStorage({ state }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.variables));
  },
  resetSavedData({ commit }) {
    commit('setVariables', []);
    localStorage.removeItem(STORAGE_KEY);
  }
}
