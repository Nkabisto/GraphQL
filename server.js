var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { buildSchema } = require("graphql");
var { ruruHTML } = require("ruru/server")
var Message = require("./Message")
var { schema, root } = require("./schemaType")

var fakeDatabase = {}
//var schemaType = new schemaType(fakeDatabase);


ar app = express();

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

	
