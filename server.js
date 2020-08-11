const express = require("express");
const http = require("http")
const bodyParser = require("body-parser");
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const jwt = require('express-jwt');
const jwks = require("jwks-rsa");
require('dotenv').config();
const schema = require('./data/schema')
const expressPlayground = require("graphql-playground-middleware-express").default;
const cors = require("cors");
const { friends } = require("./models")
const request = require("request")
const jsonwebtoken = require('jsonwebtoken')


const app = express();

const PORT = 3000;

app.use(cors())

const auth = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
});

var client = jwks({
  jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
});
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

app.use(auth)

const server = new ApolloServer({
	schema,
	subscriptions:{
		onConnect:(connectionP, ws, context)=>{
			if(connectionP.authToken){
				let user = new Promise((resolver, reject)=>{
					jsonwebtoken.verify(connectionP.authToken.split(" ")[1], getKey,{   
						audience: process.env.AUTH0_AUDIENCE,
    						issuer: process.env.AUTH0_ISSUER,
    						algorithms: ['RS256']
						}, function(err, decoded){
							if (decoded)  resolver({decoded})
						}
					)
				}).then(({decoded}) => { return {user: decoded}})

				return user
			}
		},
		onDisconnect: (webSocket, context)=>{
			console.log("deconnected")
		}
	},
	context:async ({ req, connection}) => {
		if(connection){
			console.log("connection", connection)
			return connection.context;
		}
		if(req.user){
			const friend = await friends.findOne({ where: { friend_id: req.user.sub.split("|")[1] }})
			const options = {
				method: "GET",
				url: `${process.env.AUTH0_ISSUER}api/v2/users/${req.user.sub}`,
				headers: {authorization: `Bearer ${process.env.AUTH0_V2_API}` }
			}
			if(!friend){
				request(options, (error, response, body)=> {
					if(error){
						throw new Error(error)
					}
					const user_info = JSON.parse(body)
					console.log("body",body)
					friends.create({
						friend_id: req.user.sub.split("|")[1],
						name: user_info.email.split('@')[0],
						email: user_info.email 
						})
					})		
				}
			}
		
	
		return {user: req.user}
	}
	})
server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(3000,()=> {console.log(`server ready at http://localhost:3000${server.graphqlPath}`)
		     console.log(`server ready at ws://localhost:3000${server.subscriptionsPath}`)})
/*
app.use("/api", bodyParser.json(), auth, graphqlExpress(req => ({ 
	schema ,
	context:async () => {
		if(req.user){
			const friend = await friends.findOne({ where: { friend_id: req.user.sub }})
			const options = {
				method: "GET",
				url: `${process.env.AUTH0_ISSUER}api/v2/users/${req.user.sub}`,
				headers: {authorization: `Bearer ${process.env.AUTH0_V2_API}` }
			}
			if(!friend){
				request(options, (error, response, body)=> {
					if(error){
						throw new Error(error)
					}
					const user_info = JSON.parse(body)
					friends.create({
						friend_id: req.user.sub.toString(),
						name: user_info.email.split('@')[0],
						email: user_info.email 
					})
				})		
			}
		}
		
	
		return {user: req.user}
	}
}))
);

app.get("/playground", expressPlayground({endpoint: "/api"}))
app.listen(PORT,() => {
	console.log(`server is running on http://localhost:${PORT}/api`);
})
*/
