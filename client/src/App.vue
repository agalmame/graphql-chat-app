<template>
  <div id="app">
  	<nav class="navbar is-primary">
		<div class="container">
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/">Codylia</router-link>
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<a class="navbar-item" v-if="!authenticated" @click="login()">Log In</a>
					<a class="navbar-item" v-else @click="logout()">Log Out</a>
					<router-link class="navbar-item" :to="{path:'/listusers'}">chat</router-link>
				</div>
			</div>
		</div>
	</nav>
	<main class="">
		<router-view :auth="auth" :authenticated="authenticated"></router-view>
	</main>
	<theFooter></theFooter>
  </div>
</template>

<script>
import Auth from "@/services/auth"
import theFooter from "@/components/footer"
const auth = new Auth()
const { login, logout, authenticated, authNotifier } = auth 
export default {
  name: 'App',
  components:{
  	theFooter 
  },
  data() {
  	return {
		auth,
		authenticated, 
		products: [
			{
				code: "test",
				name: "test",
				category: "test",
				quantity: "test"
			},
			{
				code: "test1",
				name: "test1",
				category: "test1",
				quantity: "test1"
			},
			{
				code: "test2",
				name: "test2",
				category: "test2",
				quantity: "test2"
			}
		]
	}
  },
  created() {
  	authNotifier.on('authChange', authState => {
		this.authenticated = authState.authenticated 
	})
  },
  methods: {
  	login,
	logout 
  }
}
</script>

<style >
	#app{
		min-height: inherit;
		display: flex;
		flex-direction: column;
	}

</style>
