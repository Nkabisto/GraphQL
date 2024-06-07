/*To handle GraphQL queries, we need a schema that defines the Query type, and we need an API root with a function called a
"resolver" for each API endpoint. For an API tha just returns "Hello world!", we can put this code in a fie named server.js
*/

var {graphql, buildSchema} = require("graphql")

// Construct a schema, using a GraphQL schema language
var schema = buildSchema(`
    type Query{
        hello: String
    }
`)

// The rootValue provides a resolver function for each API endpoint
var rootValue = {
    hello(){
        return "Hello world!"
    }
}

// Run the GraphQL query '{hello}' and print out the response
graphql({
    schema,
    source: "{hello}",
    rootValue
}).then(response => {
    console.log(response)
})
