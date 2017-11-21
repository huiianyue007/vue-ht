import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: () => ({}),
  getters: {},
  mutations: {
    'initForm'(state, opt) {
      Object.entries(opt).forEach((item) => {
        state[item[0]] = item[1];
      });
    }
  },
  actions: {}
});
