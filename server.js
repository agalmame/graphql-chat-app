const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress } = require('apollo-server-express');
const jwt = require('express-jwt');
const jwks = require("jwks-rsa");
require('dotenv').config();
const schema = require('./data/schema');
const expressPlayground = require("graphql-playground-middleware-express").default;
const cors = require("cors");
const app = express();

const PORT = 3000;

app.use(cors())

const auth = jwt({
    secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: ['RS256']
});

app.use("/api", bodyParser.json(), auth, graphqlExpress(req => ({ 
	schema ,
	context: {
		user: req.user 
	}
}))
);

app.get("/playground", expressPlayground({endpoint: "/api"}))
app.listen(PORT,() => {
	console.log(`server is running on http://localhost:${PORT}/api`);
})
