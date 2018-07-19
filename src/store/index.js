import Vue from 'vue';
import Vuex from 'vuex';
import {SOME_MUTATION} from './mutation-types';
Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    count: {num: 0},
    todos: [
      {id: 1, text: '...', done: true},
      {id: 2, text: '...', done: false},
      {id: 2, text: '...', done: false}
    ]
  },

  //getters相当于是在store中的计算属性（一些复杂的经常用到的属性可以放在这里）！！
  // Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。
  // 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，
  // 且只有当它的依赖值发生了改变才会被重新计算。
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    //  Getter 也可以接受其他 getter 作为第二个参数：
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    //  通过方法访问你也可以通过让 getter 返回一个函数，
    // 来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    getTodoById: (state) => (id) => {
      return state.todos.find((todo) => todo.id === id);
    }
  },

  mutations: {
    increment (state) {
      state.count.num++;
    },
    [SOME_MUTATION] (state, payload) {
      //一条重要的原则就是要记住 mutation 必须是同步函数。
      //实质上任何在回调函数中进行的状态的改变都是devtool不可追踪的,也就是说你这样用不会报错，只不过是你不能用
      //devtool工具追踪这种变化了
      // setTimeout(function () {
      //   state.todos[0].id = 'dsg';
      // }, 1000);

      state.todos[0].id = 'dsg' + payload;
    }
  },

  //我们可以直接在页面中分发mutataion，但是这样不可以分发mutatio为异步操作的，在mutation中不可以进行异步操作！！！
  //所以这个时候action诞生了，action就是为了解决mutation中不可以进行异步操作的问题！！！！
  //在action中进行异步操作然后再commit（'mutation'）
  actions: {
    increment ({commit}) {
      setTimeout(() => {
        commit(SOME_MUTATION);
      }, 1000);
    },
    increment2 ({commit}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit(SOME_MUTATION);
          resolve();
        }, 1000);
      });
    },
    increment3 ({commit, dispatch}) {
      dispatch('increment2').then(() => {
        console.log('大硕哥！！');
      });
    }
  }
});
