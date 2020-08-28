import { getInstance } from "./authSpa.js"

export const authGuard = (to, from, next) => {
	const authService = getInstance();

	const fn = () => {
		if (authService.isAuthenticated) {
			return next();
		}

		authService.loginWithRedirect({appState: { targetUrl: to.fullPath } });
	}

	if (!authService.loading){
		return fn();
	}

	authService.$watch("loading", loading=> {
		if( loading == false){
			return fn();
		}
	});

	console.log("this is just a message", authService.auth0Client.handleRedirectCallback());


	

}
