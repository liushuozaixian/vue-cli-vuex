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
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
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
    }
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
    })
  }
}
</script>

<style scoped>

</style>
