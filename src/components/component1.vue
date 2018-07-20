<template>
  <div>
    <h2>
      我是组件一
    </h2>
    NUM：{{count2}} <br>
    <button @click="handleClick">点击我数字加一</button>
    <br>
    NUM：{{count3}} <br>
    NUM：{{count4}} <br>
    NUM：{{count5}} <br>
    NUM：{{count.num}} <br>
    doneTodos1 : {{doneTodos1[0].id}} <br>
    doneTodosCount : {{doneTodosCount}} <br>
    getTodoById : {{getTodoById}} <br>
    通过mapGetters得到的doneTodos : {{doneTodos}} <br>
    通过mapGetters得到的改为doneTodos2 : {{doneTodos}} <br>
    我是moduleA中的数据: {{modulea}} <br>
    我是通过mapstate得到的moduleA中的数据: {{moduleA}} <br>
    <button @click="handleClick2">修改第一个id为dsg</button>
    <br>
    <button @click="handleClick3">修改第一个id为dsg</button>
    <br>
    <button @click="handleClick4">4修改第一个id为dsg</button>
    <br>
    <button @click="handleClick5">5修改第一个id为dsg</button>
    <br>
    <button @click="handleClick6">6修改第一个id为dsg</button>
    <br>
    <button @click="handleClick7">7调用modules中的mutation</button>
    <br>
    <button @click="handleClick8">8通过mapmutation调用modules中的mutation</button>
    <br>

  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import {SOME_MUTATION} from '../store/mutation-types'
export default {
  name: 'component1',
  components: {},
  data() {
    return {
      countb: {num: 100}
    };
  },
  created () {
    console.log(this.$store.state.count);
    //    this.count = this.$store.state.count;
    console.log(this.$store);
    this.$store.commit('increment')
    //    this.count = this.$store.state.count;
  },
  methods: {
    handleClick (){
      this.$store.commit('increment')
      //      this.count = this.$store.state.count;
    },
    handleClick2 (){
      //      一般方法提交mutation
      this.$store.commit(SOME_MUTATION)
    },
    handleClick3 () {
      this.SOME_MUTATION('dsg')
    },
    handleClick4 () {
      this.$store.dispatch('increment')
    },
    ...mapMutations([
      'increment2'
    ]),
    handleClick5 () {
      this.$store.dispatch('increment2').then(() => {
        alert('异步action完成了！')
      })
    },
    handleClick6 () {
      this.$store.dispatch('increment3')
    },
    //    mapActions方法处理
    //    ...mapActions([
    //      'increment2'
    //    ])
    handleClick7 () {
      this.$store.commit('a/changea');
    },
    handleClick8 () {
      this.mapa()
    },
    ...mapMutations({
      mapa: 'a/changea'
    })
  },
  computed: {
    count2 () {
      //      获取state中数据的最基本的写法！！！！！
      return this.$store.state.count
    },
    //    获取state中数据的mapState的几种不同情况的写法！！！！！
    ...mapState({
      count3: state => state.count.num,
      count4: 'count',
      count5 (state) {
        return state.count.num + this.countb.num
      }
    }),
    ...mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ]),


    //获取getters中的计算属性的最基本的方法！！！！！！！
    doneTodos1 () {
      return this.$store.getters.doneTodos
    },
    doneTodosCount () {
      return this.$store.getters.doneTodosCount
    },
    //  通过方法访问你也可以通过让 getter 返回一个函数，
    // 来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。
    getTodoById () {
      return this.$store.getters.getTodoById(2)
    },
    //  通过mapGetters来获取store中的getters的计算属性
    ...mapGetters(['doneTodos']),
    //    通过mapGetters来获取store中的getters的计算属性并改名
    ...mapGetters({
      doneTodos2: 'doneTodos'
    }),
    modulea () {
      return this.$store.state.a.moduleA
    },
    //    mapState绑定带有命名空间的数据
    ...mapState({
      moduleA: state => state.a.moduleA
    })
  }
}
</script>

<style scoped>

</style>
