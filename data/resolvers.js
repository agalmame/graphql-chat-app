const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config()

const resolvers = {
	Query: {
		async me(_,args , { user }) {
			if(!user) {
				throw new Error('you are not authenticated');
			}
			console.log("dfsf")
			return await User.findById(user.id)
		}
	},

	Mutation: {
		async signup (_, { username, email, password , confirmeP }){
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
		}

	}
}

module.exports = resolvers;
