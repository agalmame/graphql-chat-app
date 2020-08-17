const jwt = require("express-jwt")
const jwks = require("jwks-rsa")
const jsonwebtoken = require("jsonwebtoken")
require("dotenv").config()






var client = jwks({
  jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
});
function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

exports.verify = function (token){

	return new Promise((resolver, reject)=>{

			jsonwebtoken.verify(
				token.split(" ")[1],
				getKey,{   
					audience: process.env.AUTH0_AUDIENCE,
					issuer: process.env.AUTH0_ISSUER,
					algorithms: ['RS256']
				},
				function(err, decoded){
					if (decoded)  resolver({decoded})
				}
			)
		})
}

exports.auth = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256'],
});
