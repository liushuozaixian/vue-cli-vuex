import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: {num: 0}
  },
  mutations: {
    increment (state) {
      state.count.num++;
    }
  }
});
