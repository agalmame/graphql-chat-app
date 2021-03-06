const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
	type User {
		friend_id: String!
		name: String!
		email: String!
	}
	
	type Todo {
		userId: ID!
		title: String!
	}
	
	type Chat {
		sender: String!
		message: String!
	}
	
	type Query {
		me: User 
		myTodo: [Todo]
		friends: [User]
		conversation(from: String!, to: String!): [Chat]
	}
	
	type Mutation {
		signup(username: String!, email: String!, password: String!, confirmeP: String!): String
		login(email: String!, password: String!): String 
		addTodo(title: String!): Todo
		sendMessage(from: String!, to: String, message: String!): Chat
		
	}
	
	type Subscription {
		messageSent(to: String!, from: String!): Chat 
	}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
