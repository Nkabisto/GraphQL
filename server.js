var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server")
var RandomDie = require('./RandomDie');

// Construct a schema, using GraphQL schema language 
var schema = buildSchema(/* GraphQL */`
	type RandomDie {
		numSides: Int!
		rollOnce: Int!
	  roll(numRolls: Int!): [Int]
	}

	type Query{
		getDie(numSides: Int): RandomDie
	 }
`)	 

// The root provides the top-level API endpoints
	var root = {
		getDie({ numSides }){
			return new RandomDie(numSides || 6);
		},
	}

var app = express()

app.all(
	"/graphql",
	createHandler({
		schema: schema,
		rootValue: root,
	})
)

// Serve the GraphQL IDE.
app.get("/",(_req,res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/graphql")

	
