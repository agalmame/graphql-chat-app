import Vue from 'vue'
import App from './App'
import router from './router'
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { InMemoryCache } from "apollo-cache-inmemory"
import VueApollo from "vue-apollo"
import { ApolloLink, split } from "apollo-link"
import { Auth0Plugin } from "./services/authSpa.js"
import { domain, clientId } from "../auth_config.json";



Vue.config.productionTip = false
console.log("1")
Vue.use(Auth0Plugin, {
	domain,
	clientId,
	onRedirectCallback: appState => {
		router.push(
			appState && appState.targetUrl ? appState.targetUrl : window.location.pathname
		)
	}
}) 
console.log("2")
//const token = localStorage.getItem('graphql_auth0_access_token')
export const main =(auth0Client, token)=>{
		
	const httpLink = new HttpLink({
		uri: "http://localhost:3000/graphql"

	})
	let wsLink= new WebSocketLink({uri: "ws://localhost:3000/graphql"})
	if (token){
		console.log("toktok:",token.__raw)
	wsLink = new WebSocketLink({
		uri: "ws://localhost:3000/graphql",
		options: {
			timeout: 40000,
			reconnect: true,
			connectionParams:{
					authToken: token ? `Bearer ${token.__raw}` : ''
				} 
			}
		
	})}

	console.log("5")
	console.log("sdafas",token)
	console.log(wsLink)
	const authLink = setContext((_, { headers }) => {
		return auth0Client.getIdTokenClaims()
			.then(({ __raw: token }) => {
				console.log("token3",token)
				return {
					headers: {
						...headers,
						Authorization: token ? `Bearer ${token}` : null
					}
				}
			})
	})
	const theLink = split(
		({ query })=>{
			const { kind, operation } = getMainDefinition(query)
			console.log(operation)
			return (kind === 'OperationDefinition' && operation === 'subscription')
		},
		wsLink,
		httpLink 
	)

	/*const afterwareLink = new ApolloLink((operation, forward) =>
	    forward(operation).map(response => {
		const context = operation.getContext()
		const {
		    response: { headers },
		} = context

		console.log(operation)

		return response
	    })
	)*/
	const link = ApolloLink.from([authLink,theLink ])

	const apolloClient = new ApolloClient({
		link,
		cache: new InMemoryCache(),
		connectToDevTools: true 
	})

	Vue.use(VueApollo)

	const apolloProvider = new VueApollo({
		defaultClient: apolloClient 
	})



	new Vue({
	  router,
	  apolloProvider,
	  render: h => h(App),
	}).$mount('#app')
}
