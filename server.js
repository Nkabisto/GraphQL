var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { RandomDie } = require("./RandomDie.js");

// Construct a schema, using GraphQL schema language 
var schema = buildSchema(/* GraphQL */`
	type RandomDie {
		numSides: Int!
		roll: Int!
	rollDice(numRolls: Int!): [Int]
	}

	type Query{
		getDie(numSides: Int): RandomDie
	 }
`)	 

// The root provides a resolver function for each API endpoint
var root = {
		rollDice({ numDice, numSides}) {
		var output = []
		for (var i = 0; i < numDice; i++) {
			output.push(1 + Math.floor(Math.random() * (numSides || 6)))
		}
		return output;
	},
}

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

app.listen(4000)
console.log("Running a GraphQL API server at localhost:4000/graphql")
