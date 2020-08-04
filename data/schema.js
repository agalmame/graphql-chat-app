const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
	type User {
		id: Int!
		username: String!
		email: String!
	}
	
	type Todo {
		userId: ID!
		title: String!
	}
	
	type Query {
		me: User 
		myTodo: [Todo]
	}
	
	type Mutation {
		signup(username: String!, email: String!, password: String!, confirmeP: String!): String
		login(email: String!, password: String!): String 
		addTodo(title: String!): Todo 
		
	}
`

module.exports = makeExecutableSchema({typeDefs, resolvers})
