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

Vue.config.productionTip = false

const token = localStorage.getItem('graphql_auth0_access_token')
const httpLink = new HttpLink({
	uri: "http://localhost:3000/graphql"

})

const wsLink = new WebSocketLink({
	uri: "ws://localhost:3000/graphql",
	options: {
		timeout: 30000,
		reconnect: true,
		connectionParams: {
				authToken: token ? `Bearer ${token}` : ''
		}
	}
	
})
console.log(wsLink)
const authLink = setContext((_, { headers }) => {
//	const token = localStorage.getItem('graphql_auth0_access_token')
	return {
		headers: {
			...headers,
			Authorization: token ? `Bearer ${token}` : null
		}
	}
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
