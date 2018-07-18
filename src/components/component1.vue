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
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
    ])
  }
}
</script>

<style scoped>

</style>
