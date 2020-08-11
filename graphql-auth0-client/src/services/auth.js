import auth0 from "auth0-js"
import EventEmitter from "EventEmitter"
import router from "./../router"

export default class Auth {
	authenticated = this.isAuthenticated()
	authNotifier = new EventEmitter()

	constructor (){
		this.login = this.login.bind(this)
		this.setSession = this.setSession.bind(this) 
		this.logout = this.logout.bind(this)
		this.isAuthenticated = this.isAuthenticated.bind(this)
	}

	auth0 = new auth0.WebAuth({
		domain: 'dev-jp-ctqz9.eu.auth0.com',
		clientID: 'jpEBXu7GerL2kDpH1aDp3Pfpwy0fmhx0',
		redirectUri: 'http://localhost:8080/callback',
		audience: 'https://graphql-api',
		responseType: 'token id_token',
		scope: 'openid email profile'
	})

	login() {
		this.auth0.authorize();
	}

	handleAuthentication(){
		this.auth0.parseHash((err, authResult) => {
			if(authResult && authResult.accessToken && authResult.idToken){
				this.setSession(authResult)
				router.replace('/')
			}
		}) 
	}
	setSession(authResult, profile) {
		const expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date().getTime()
		)
		localStorage.setItem('graphql_auth0_sub', authResult.idTokenPayload.sub.split("|")[1])
		localStorage.setItem('graphql_auth0_access_token', authResult.accessToken)
		localStorage.setItem('graphql_auth0_id_token', authResult.idToken)
		localStorage.setItem('graphql_auth0_expires_at', expiresAt)

		this.authNotifier.emit('authChange', { authenticated: true })
	}

	logout() {
		localStorage.removeItem('graphql_auth0_access_token')
		localStorage.removeItem('graphql_auth0_id_token')
		localStorage.removeItem('graphql_auth0_expires_at')

		this.authNotifier.emit('authChange', false)

		router.replace('/')
	}

	isAuthenticated() {
		const expiresAt = JSON.parse(
			localStorage.getItem('graphql_auth0_expires-at')
		)
		
		return new Date().getTime < expiresAt 
	}
}
