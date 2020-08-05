<template>
  <div id="app">
  	<nav class="navbar is-primary">
		<div class="container">
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/">GraphQL Auth0</router-link>
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
	<div class="container">
		<router-view :auth="auth" :authenticated="authenticated"></router-view>
	</div>
  </div>
</template>

<script>
import Auth from "@/services/auth"
const auth = new Auth()
const { login, logout, authenticated, authNotifier } = auth 
export default {
  name: 'App',
  data() {
  	return {
		auth,
		authenticated 
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

<style>

</style>
