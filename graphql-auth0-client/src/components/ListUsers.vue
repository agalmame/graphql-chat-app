<template>
	<section>
		<div class="col1">
			<ul class="list">
				<p class="list-title"> Your Friends</p>
				<li @click="redirectMsg(friend)" v-if="friends.length != 0" v-for="friend in friends " :key="friend.friend_id" class="list-item">
					<div class="friend-img"></div><p class="friend-name">{{ friend.name }}</p>
				</li>
				<p v-else>No User</p>
	
			</ul>
		</div>
		<div class="col2">
			<router-view :user="user"></router-view>
		</div>
	</section>
</template>
<script>
	import gql from "graphql-tag"
	export default {
		data() {
			return {
				friends:[],
				user: window.localStorage.getItem('graphql_auth0_sub')
					
			}
		},
		props: ["authenticated"],
		methods: {
			redirectMsg(friend) {
				this.$router.push(
					{path: `/listusers/${friend.friend_id}`}
				)
			}
		},
		beforeRouteEnter(to, from, next){
			next(vm => vm.authenticated ? next() : next("/"))
		},
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
