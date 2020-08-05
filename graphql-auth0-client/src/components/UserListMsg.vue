<template>
	<div class="window">
			<p></p>
			<ul class="messages-list">
				<li class="messages-list-item"></li>	
			</ul>
			<form @submit.prevent class="form-message">
				<input type="text" placeholder="type here" v-model.trim="message" />
				<button class="button-send" @click="send()">send</button>
			</form>
	</div>
</template>

<script>
	import gql from "graphql-tag"
	export default {
		data (){
			return {
				message: ""		
			}
		},
		computed: {
			id() {
				return this.$route.params.id
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
		display: flex;
		flex-direction: column;
		justify-content: left;
		align-items: center;
		margin: 10px 2px;
		border: 1px solid #e6ecf0;
		background-color: #fff;
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
