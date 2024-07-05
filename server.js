var express = require("express");
var { createHandler } = require("graphql-http/lib/use/express");
var { ruruHTML } = require("ruru/server");
const { schema } = require("./schemaType");
const { root } = require("./resolvers");

var app = express();

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

	
