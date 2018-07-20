import Vue from 'vue';
import Vuex from 'vuex';
import {SOME_MUTATION} from './mutation-types';
Vue.use(Vuex);

const moduleA = {
  //当不写namespaced: true的时候时，
  // 模块内部的 action、mutation 和 getter 是注册在全局命名空间的我们可以在任何组件内部直接调用
  //当写了namespaced: true的时候时，
  //就不能直接调用了需要用到类似getters['a/changea']这种写法才可以，
  //模块内的状态state已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  namespaced: true,
  state: {moduleA: 'ma'},
  mutations: {
    changea (state) {
      state.moduleA = 'changed-ma';
    }
  },
  actions: {
    asyncchangea ({state, commit}) {
      commit('changea');
    }
  }
};

const moduleB = {
  state: {moduleB: 'mb'},
  mutations: {
    changeb (state) {
      state.moduleB = 'changed-mb';
    }
  },
  actions: {
    asyncchangeb ({state, commit}) {
      commit('changeb');
    }
  }
};

export default new Vuex.Store({
  //加入module模块
  modules: {
    a: moduleA,
    b: moduleB
  },

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
