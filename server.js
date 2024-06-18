/** Let's modify our "hello world" example so that it's an API sever rather tan a script that runs a single query. We can use the 'express' module to 
 * run a webserver, and instead of executing a query directly with the graphql function, we can use the graphql-http library to mount a GraphQL API 
 * server on the "/graphql" HTTP endpoint:
 */

var express = require("express")
var { createHandler } = require("graphql-http/lib/use/express")
var { buildSchema } = require("graphql")

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
	type Query {
		hello: String
	}
`)

// The root provides a resolver function for each API endpoint		
var root = {
	hello(){
		return "Hello world!"
	},
}

var app = express()

// Create and use the GraphQL handler.
app.all(
	"/graphql",
	createHandler({
		schema: schema,
		rootValue: root,
	})
)

// Start the server at port 
app.listen(4000)
console.log("Running a GraphQL API Server at http://localhost:4000/graphql")
