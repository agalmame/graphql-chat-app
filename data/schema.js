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
	
	type Query {
		me: User 
		myTodo: [Todo]
		users: [User]
	}
	
	type Mutation {
		signup(username: String!, email: String!, password: String!, confirmeP: String!): String
		login(email: String!, password: String!): String 
		addTodo(title: String!): Todo 
		
	}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
