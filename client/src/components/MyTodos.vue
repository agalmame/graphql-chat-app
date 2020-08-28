<template>
	<div class="section">
		<h2 class="title">My Todos</h2>a
		<ul>
			<p v-if="myTodo.length === 0">No todos!</p>
			<TieredMenu :model="todos"/>
		</ul>
	</div>
</template>
<script>
	import { MY_TODOS_QUERY } from "@/graphql"
	import TieredMenu from "primevue/tieredmenu"	
	export default {
		name: "MyTodos",
		components: {
			TieredMenu,	
		},
		data() {
			return {
				myTodo: []
			}
		},
		computed:{
			todos(){
				let todos=[];
				this.myTodo.map((e)=>{
					todos.push({label: e.title,icon: "pi pi-fw pi-calendar"})
				})
				console.log(todos)
				return todos	
			}
		},
		//beforeRouteEnter (to, from, next) {
		//	next(vm =>{
		//		return vm.authenticated ? next() : next('/')
		//	})
		//},
		apollo: {
			myTodo: {
				query: MY_TODOS_QUERY
			}
		}
	}
</script>
