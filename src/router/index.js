import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Component1 from '../components/component1.vue'
import Component2 from '../components/component2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/component1',
      name: 'Component1',
      component: Component1
    },
    {
      path: '/component2',
      name: 'Component2',
      component: Component2
    }
  ]
})
