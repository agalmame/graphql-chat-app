// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import VueApollo from "vue-apollo"

Vue.config.productionTip = false

const httpLink = new HttpLink({
	uri: "http://localhost:3000/api"
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('graphql_auth0_access_token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null
		}
	}
})

const apolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
	defaultClient: apolloClient 
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  components: { App },
  template: '<App/>'
})
