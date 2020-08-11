const {  task, friends} = require('../models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Op = require("sequelize").Op
require('dotenv').config()
const { PubSub, withFilter } = require("apollo-server")


const ps = new PubSub()


const chats = []
const CHAT_CHANNEL = 'CHAT_CHANNEL'

const resolvers = {
	Query: {
/*		async me(_,args , { user }) {
			if(!user) {
				throw new Error('you are not authenticated');
			}
			return await User.findById(user.id)
		},*/
		async myTodo(_,args, context) {
			const {user}  = await context
			if(!user) {
				throw new Error("you are not authorized");
			}

			const all = await task.findAll({
				attributes: ["id", "title"],
				where: {
					task_id: user.sub
				}
			})
			return all
		},
		async friends(_, args, context){
			const { user } = await context
			if(!user){
				throw new Error("no auth")
			}
			return await friends.findAll({
				where: {
					friend_id: {
						[Op.notLike]: user.sub.split("|")[1] 
					}
				},
				attributes:["friend_id","name","email"]
			})
		},
		async chats (_, args, context){
			return chats 
		}
	},

	Mutation: {
/*		async signup (_, { username, email, password , confirmeP }){
			if(password == confirmeP){
				const user = await User.create({
					username,
					email,
					password: await bcrypt.hash(password, 10),
				})

				return jsonwebtoken.sign(
					{ id: user.id, email: user.email },
					process.env.JWT_SECRET,
					{ expiresIn: '1y' }
				)
			}else throw new Error('password not similar');
		},
		async login (_, { email, password }) {
			const user = await User.findOne({ where: { email } })

			if (!user) {
				throw new Error('not signup yet');
			}

			const verify = await bcrypt.compare(password, user.password)
			if(!verify){
				throw new Error("incorect password")
			}

			return jsonwebtoken.sign(
				{ id: user.id, email: user.email },
				process.env.JWT_SECRET,
				{ expiresIn: '1d' }
			)
		},*/
		async addTodo (_, {title}, context) {
			const {user} = await context 
			if(!user){
				throw new Error("you are not authorized")
			}
			const todo = await task.create({
				task_id: user.sub,
				title 
			})

			return todo 
		},
		async sendMessage (_, {from, to, message}, context) {
			const chat = { id: chats.length +1, from, to, message }
			chats.push(chat)
			ps.publish('CHAT_CHANNEL', { messageSent: chat })
			console.log(chat)
			return chat 
		}

	},
	Subscription: {
		messageSent: {
			subscribe: withFilter(()=>{
					console.log("subscribe \n")
					return ps.asyncIterator(CHAT_CHANNEL)
				},
			 	(payload, variables, context)=>{ 
					console.log("payload",payload)
					console.log("variables", variables)
					console.log("context", context.user.sub.split("|")[1])
					let v = !!(variables.chat_id==context.user.sub.split("|")[1] || context.user.sub.split("|")[1]==payload.to )
					console.log(v)
					return !!(context.user.sub.split("|")[1]==payload.messageSent.to || payload.messageSent.from == context.user.sub.split("|")[1]) 
				}
			)
		}
	}
}

module.exports = resolvers;
