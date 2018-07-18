<template>
  <div class="hello">
    <h1 @click="handleClick">点击我跳转到组件一</h1>
    <h1 @click="handleClick2">点击我跳转到组件二</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    handleClick () {
      this.$router.push('/component1')
    },
    handleClick2 () {
      this.$router.push('/component2')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
