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

app.use(cors)

const auth = jwt({
	secret: process.env.JWT_SECRET,
	credentialsRequired: false
})
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
