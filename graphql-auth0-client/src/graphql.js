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
	query ChatsQuery {
		chats {
			id
			from
			to 
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
			id
			from
			to 
			message
		}
	}
`
export const MESSAGE_SENT_SUBSCRIPTION = gql`
	subscription MessageSentSubscription ($chat_id: String!){
		messageSent (chat_id: $chat_id) {
			id
			from
			to
			message 
		}
	}
`


