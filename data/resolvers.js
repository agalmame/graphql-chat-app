const {  task, friends, conversation, message: messagedb} = require('../models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const Op = require("sequelize").Op
require('dotenv').config()
const { PubSub, withFilter } = require("apollo-server")
const {conv} = require("../services/mixins")

const ps = new PubSub()


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
			return  await friends.findAll({
				where: {
					friend_id: {
						[Op.notLike]: user.sub.split("|")[1] 
					}
				},
				attributes:["friend_id","name","email"]
			})
		},
		async conversation (_, { from , to}, context){
			const { conv_sender, conv_receiver } = await conv(from,to)
			if (conv_sender){
				return await messagedb.findAll({attributes: ["sender","message"],where: {conversation_id:conv_sender.conversation_id}}) 
			}else if(conv_receiver){
				return await messagedb.findAll({attributes:["sender","message"],where: {conversation_id:conv_receiver.conversation_id}})
			}
			return []
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
		async sendMessage (_, {from, to, message},context) {
			const {conv_sender, conv_receiver} = await conv(from , to)
			let msg = null;
			if(conv_sender){
				try {
					 msg = await messagedb.create({
						conversation_id:conv_sender.conversation_id,
						sender: from,
						message,
					})
				msg = {conversation_id:msg.conversation_id,sender:msg.sender,message:msg.message}
				}catch(e){
					throw new Error(e.message)
				}
			}else if(conv_receiver){
				try{
					msg = await messagedb.create({
						conversation_id:parseInt(conv_receiver.conversation_id),
						sender: from,
						message,
					})
					msg = {conversation_id:msg.conversation_id,sender:msg.sender,message:msg.message}
				}catch(e){
					throw new Error(e.message)
				}
			}
			ps.publish('CHAT_CHANNEL', { messageSent: msg })
			return msg 
		}

	},
	Subscription: {
		messageSent: {
			subscribe: withFilter(()=>{
					console.log('messageSent (withFilter)')
					return ps.asyncIterator(CHAT_CHANNEL)
				},
			 	async (payload, variables, context)=>{ 
					const conv = await conversation.findOne({attributes:["conversation_id","sender","receiver"],where: {conversation_id: payload.messageSent.conversation_id}})
					if(conv.sender==payload.messageSent.sender){
						var receiver = conv.receiver;
						var sender = conv.sender;
					}else {
						var receiver = conv.sender
						var sender = conv.receiver
					}
					return !!((context.user.sub.split("|")[1]==receiver && variables.to==payload.messageSent.sender) || context.user.sub.split("|")[1]==sender) 
				}
			)
		}
	}
}

module.exports = resolvers;
