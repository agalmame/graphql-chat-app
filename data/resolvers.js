const { User, task} = require('../models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config()
let i = 0;
const resolvers = {
	Query: {
/*		async me(_,args , { user }) {
			if(!user) {
				throw new Error('you are not authenticated');
			}
			return await User.findById(user.id)
		},*/
		async myTodo(_,args, { user }) {
			if(!user) {
				throw new Error("you are not authorized");
			}

			const all = await task.findAll({
				attributes: ["id", "title"],
				where: {
					task_id: user.sub
				}
			})
			console.log(i++)
			return all
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
		async addTodo (_, {title}, {user}) {
			if(!user){
				throw new Error("you are not authorized")
			}
			const todo = await task.create({
				task_id: user.sub,
				title 
			})

			return todo 
		}

	}
}

module.exports = resolvers;
