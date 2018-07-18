<template>
  <div>
    <h2>
      我是组件一
    </h2>
    NUM：{{count2}} <br>
    <button @click="handleClick">点击我数字加一</button>
  </div>
</template>

<script>
export default {
  name: 'component1',
  components: {},
  data() {
    return {
      count: {num: 0}
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
      return this.$store.state.count
    }
  }
}
</script>

<style scoped>

</style>
