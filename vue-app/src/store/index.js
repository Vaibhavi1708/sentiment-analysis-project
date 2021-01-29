import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const state = {
  userId: null
};
const mutations = {
    setUserId(state, { id }) {
      state.userId = id;
    }
  },
  actions = {
    setUserId(context, id) {
      context.commit("setUserId", {
        id
      });
    }
  },
  getters = {
    getUserId(state) {
      return state.userId;
    }
  };

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state,
  getters,
  mutations,
  actions
});
