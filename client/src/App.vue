<template>
  <div id="app">
  	<nav class="navbar is-primary">
		<div class="container">
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/">Codylia</router-link>
			</div>
			<div class="navbar-menu">
				<div class="navbar-end">
					<a class="navbar-item" v-if="!$auth.isAuthenticated" @click="login">Log In</a>
					<a class="navbar-item" v-else @click="logout()">Log Out</a>
					<router-link class="navbar-item" :to="{path:'/listusers'}">chat</router-link>
				</div>
			</div>
		</div>
	</nav>
	<main class="">
		<router-view></router-view>
	</main>
	<theFooter></theFooter>
  </div>
</template>

<script>
//import Auth from "@/services/auth"
import theFooter from "@/components/footer"
//const auth = new Auth()
//const { login, logout, authenticated, authNotifier } = auth 
export default {
  name: 'App',
  components:{
  	theFooter 
  },
  data() {
  	return {
//		auth,
//		authenticated, 
	}
  },
  created() {
//  	authNotifier.on('authChange', authState => {
//		this.authenticated = authState.authenticated 
//	})
  },
  methods: {
	  login(){
	  	this.$auth.loginWithRedirect();
	  },
	  logout(){
		  this.$auth.logout({
		  	returnTo: window.location.origin
		  })
	  } 
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
