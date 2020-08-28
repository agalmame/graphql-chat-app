const express = require("express");
const http = require("http")
const bodyParser = require("body-parser");
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const schema = require('./data/schema')
const expressPlayground = require("graphql-playground-middleware-express").default;
const cors = require("cors");
const { friends, conversation }=require("./models")
const jsonwebtoken = require('jsonwebtoken')
const { auth, verify } = require("./services/validate")
const {conv, createUser} = require("./services/mixins")
const app = express();

const PORT = 3000;

app.use(cors())

app.use(auth)

const server = new ApolloServer({
	schema,
	subscriptions:{
		onConnect:(connectionP, ws, context)=>{
			if(connectionP.authToken){ 
				const user = verify(connectionP.authToken).then(({decoded})=>{ return { user: decoded}})
				return user
			}
		}
	},
	context: async ({ req, connection}) => {
		if(connection){
			console.log('context(ws)')
			const {conv_sender, conv_receiver} =await conv(connection.variables.from, connection.variables.to)
			if (!conv_sender && !conv_receiver){
				var { conversation_id ,sender, receiver} = await conversation.create({
					sender: connection.variables.from,
					receiver: connection.variables.to 
				})
			}
			return {...connection.context};
		}
		if(req.user){
			console.log('context(http)')
			const friend = await friends.findOne({attributes:["friend_id"], where: { friend_id: req.user.sub.split("|")[1] }})
			if(!friend){
					createUser(req)
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

