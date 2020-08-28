<template>
	<section>
		<div class="col1">
			<ul class="list">
				<p class="list-title"> Your Friends</p>
				<Listbox v-if="friends.length!=0" :options="friends" optionLabel="name">
					<template v-slot:option="slotProps">
    						        <div  @click="redirectMsg(slotProps.option)">{{slotProps.option.name}}</div>
    					</template>
				</Listbox>
				<p v-else>No User</p>
				<!--<SlotTest :users="test" >
				<template v-slot:test="slotProps">
						<span @click="slotProps.flipp(slotProps.mytest.city)" >{{slotProps.mytest.city}}</span>
					</template>
				</SlotTest>-->
	
			</ul>
		</div>
		<div class="col2">
			<router-view :user="user"></router-view>
		</div>
	</section>
</template>
<script>
	import gql from "graphql-tag"
	import Listbox from 'primevue/listbox';
	import SlotTest from "./SlotTesting.vue"
	export default {
		components:{
			Listbox,
			SlotTest
		},
		data() {
			return {
				test: [{name: "bar",city: "meknes"},{name: "foo",city:"florida"}],
				friends:[],
				user: this.$auth.user.then(user => { return user.sub })
					
			}
		},
		methods: {
			redirectMsg(friend) {
				this.$router.push(
					{path: `/listusers/${friend.friend_id}`}
				)
			},
			flip(city){
				let fliped = city.split("").reverse().join("")
				alert(fliped)
			}
		},
		//beforeRouteEnter(to, from, next){
		//	next(vm => vm.authenticated ? next() : next("/"))
		//},
		apollo :{
			friends:{
				query: gql `
					query friendsQuery {
						friends {
							friend_id
							name
							email
						}
					}	
				`	
			} 		
		}
	}
</script>
<style scoped>
	section {
		display: flex;
		flex-direction: row;
		height: 90vh;
		width: 100vw;
		margin: 0 20px;
	}
	.col1  {
		flex-basis: 40%;
		flex-grow:1;
		flex-shrink: 0;
	}
	.col2 {
		flex-basis: 60%;
		flex-grow: 3;
	}
	.list {
		height: 90%;
		width: 100%;
		display: flex;
		flex-direction: column;
		list-style: none;
	}
	.list-item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0px;
		height: 10%;
		width: 90%;
		border-bottom: 1px solid grey;
		font-weight: 500px;
		font-size: 2rem;
	}
	.friend-img {
		width: 20%;
		margin-right: auto;
		height: 90%;
		border-radius: 50% 50% 50% 50%;
		background-color: rgb(137 142 144 / 40%);
	}

	
</style>
