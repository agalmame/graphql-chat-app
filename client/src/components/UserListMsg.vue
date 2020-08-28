<template>
	<div class="window">
			<p></p>
			<ul class="messages-list">
				<li v-for="(chat, id ) in conversation" :key="id" class="messages-list-item">
					<strong>{{ chat.sender }}</strong>:
					{{ chat.message }}
				</li>
				<li>&nbsp;</li>
			</ul>
			<form @submit.prevent class="form-message">
				<input type="text" placeholder="type here"	
				v-model.trim="message" />
				<button class="button-send" @click="sendMessage">send</button>
			</form>
	</div>
</template>

<script>
	import gql from "graphql-tag"
	import { CHATS_QUERY, SEND_MESSAGE_MUTATION, MESSAGE_SENT_SUBSCRIPTION } from "@/graphql"
	export default {
		data (){
			return {
				conversation: [],
				message: '',
				u: '' 
			}
		},
		props:['user'],
		computed: {
			id() {
				return this.$route.params.id 
			},
			user_id(){

				this.$auth.user.then(user => { console.log("u :",user.sub); this.u=user.sub })
				return this.$auth.user.then(user => { return user.sub }) 
			},
			
		},
		async created(){
			this.u = await this.user 
			document.querySelector(".messages-list").scrollTo(0,10000)
		},
		updated(){
			document.querySelector(".messages-list").scrollTo(0,10000)
		},

		methods: {
			async sendMessage(){
				const message = this.message;
				this.message = "";
				
				await this.$apollo.mutate({
					mutation: SEND_MESSAGE_MUTATION,
					variables: {
						from: this.u.split('|')[1],
						to: this.id,
						message
					}
				})
			}
		},
		apollo: {
			conversation: {
				query: CHATS_QUERY,
				variables(){
					return{
						from: this.u.split('|')[1],
						to: this.id
					}
				},
				subscribeToMore: {
					document: MESSAGE_SENT_SUBSCRIPTION,
					variables (){
						return {
							to: this.id,
							from: this.u.split('|')[1]
						}
					
					},
					updateQuery:(previousData, { subscriptionData }) => {
						document.querySelector(".messages-list").scrollTo(0,10000)
						return {
							conversation: [...previousData.conversation, subscriptionData.data.messageSent]
						}
					},
					onError: (err)=>console.error(err)
				}
			}

		}
	}
</script>
<style scoped>
	.window{
		height: 100%;
		width: 100%;
	}
	.messages-list {
		max-width: 600px;
		width: 80%;
		height: 80%;
	/*	display: flex;
		flex-direction: column;*/
		justify-content: left;
		align-items: center;
		margin: 10px 2px;
		border: 1px solid #e6ecf0;
		background-color: #fff;
		overflow-y: auto;
	}
	form.form-message {
		background: #fff;
		line-height: 40px;
		padding: 10px;
		display: flex;
		max-width: 600px;
		justify-content: space-between;
		width: 80%;
	}
	form.form-message input{
		height: 50px;
	}
	form.form-message button:disabled{
		opacity: 0.5;
	}
	form.form-message button {
		width: 30%;
		border-radius: 3px 3px 3px 3px;
		background: #30A0EE;
		outline: 0;
		color: white;
		font-size: 20px;


	}
</style>
