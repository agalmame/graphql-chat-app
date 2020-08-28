import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from "@/components/Callback"
import MyTodos from "@/components/MyTodos"
import AddTodo from "@/components/AddTodo"
import ListUsers from "@/components/ListUsers"
import UserListMsg from "@/components/UserListMsg"
import { authGuard } from "@/services/authGard"


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
      component: MyTodos,
      beforeEnter: authGuard,
      
    },
    {
      path: "/addtodo",
      component: AddTodo,
      beforeEnter: authGuard,
	
    },
    {
      path: "/listusers",
      children: [
      	{
		path: ':id',
		component: UserListMsg,
		beforeEnter: authGuard,
		
	}
      ],
      component: ListUsers,
      beforeEnter: authGuard,
    }
  ]
})
