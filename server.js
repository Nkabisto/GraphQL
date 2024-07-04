var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server")

// Construct a schema, using GraphQL schema language 
var schema = buildSchema(/* GraphQL */`
	type Mutation {
		setMessage(message: String): String	
	}

	type Query{
	 getMessage: String
	}
`)	 

var fakeDatabase = {}
var root = {
	setMessage({ message }){
		fakeDatabase.message = message;
		return message;
	},
	getMessage(){
		return fakeDatabase.message;
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

	
