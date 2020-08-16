import gql from 'graphql-tag'

export const MY_TODOS_QUERY = gql `
	query MyTodosQuery {
		myTodo {
			title
		}
	}
`
export const ADD_TODO_MUTATION = gql`
	mutation AddTodoMutation($title: String!){
		addTodo(title:$title){
			title
		}
	}
`

export const CHATS_QUERY = gql`
	query ConversationQuery ($from: String!, $to: String!){
		conversation(from: $from,to: $to) {
			sender  
			message
		}
	}
`
export const SEND_MESSAGE_MUTATION = gql`
	mutation SendMessageMutation($from: String!, $to: String, $message: String!) {
		sendMessage(
			from: $from,
			to: $to,
			message: $message 
		){
			sender 
			message
		}
	}
`
export const MESSAGE_SENT_SUBSCRIPTION = gql`
	subscription MessageSentSubscription ($to: String!, $from: String!){
		messageSent (
			to: $to,
			from: $from 
		) {
			sender 
			message 
		}
	}
`


