import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from "@/components/Callback"
import MyTodos from "@/components/MyTodos"
import AddTodo from "@/components/AddTodo"

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: "/callback",
      name: "Callback",
      component: Callback
    },
    {
      path: "/mytodos",
      name: "MyTodos",
      component: MyTodos 
      
    },
    {
      path: "/addtodo",
      component: AddTodo 
    }
  ]
})
