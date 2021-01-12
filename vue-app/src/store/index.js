import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = {

      isLoggedIn: false

  }
 const mutations = {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
  actions = {
    login(context) {
      context.commit('login');
    },
    logout(context) {
      context.commit('logout');
    },
  },
  getters = {
    isAuthenticated(state) {
      return state.isLoggedIn;
    }
  }


export default new Vuex.Store({
  state,getters,mutations,actions
});
