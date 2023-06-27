export const MODULE_NAME = 'input-values';
const STORAGE_KEY = 'input_values';
const DEFAULT_VARIABLE_OBJECT = { name: '', type: null, initialValue: null };

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
  setState(state, newState) {
    state.variables = newState.variables;
    state.lastAddedIndex = newState.lastAddedIndex;
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
    const state = localStorage.getItem(STORAGE_KEY);
    if (!state) {
      return;
    }
    commit('setState', JSON.parse(state));
  },
  saveToStorage({ state }) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },
  resetSavedData({ commit }) {
    commit('setState', { lastAddedIndex: 0, variables: [] });
    localStorage.removeItem(STORAGE_KEY);
  }
}
