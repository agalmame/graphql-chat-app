const {conversation, friends ,message: messagedb} = require("../models")
const fetch = require("node-fetch")
require("dotenv").config()


module.exports.conv = async function(from, to){

	return {
		conv_sender: await conversation.findOne({attributes:["conversation_id","sender","receiver"], where : { sender: from , receiver: to} }),
		conv_receiver :await conversation.findOne({ attributes:["conversation_id","sender","receiver"],where : { sender: to, receiver: from }})
	}

}


module.exports.createUser = function(req){
	fetch(
		"https://dev-jp-ctqz9.eu.auth0.com/oauth/token",{
			method: "POST",
			headers: {
				'content-type' : 'application/json'
			},
			body : process.env.AUTH0_API_V2
		}).then(res => res.json())
		.then(({access_token}) => {
			console.log("access_token: ",access_token)

				fetch(
					`${process.env.AUTH0_ISSUER}api/v2/users/${req.user.sub}`,{
						method: "GET",
						headers: {"authorization": `Bearer ${access_token}`}
					}).then(res => res.json())
					.then(json => {
						friends.create({
							friend_id: req.user.sub.split("|")[1],
							name: json.email.split('@')[0],
							email: json.email 
						})
					})
		})
}

