var { buildSchema } = require("graphql")
var Message = require("./Message")

var schema = buildSchema(/* GraphQL */`
  input MessageInput{
    content: String
    author: String
  },

  type Message{
    id: ID!
    content: String
    author: String
  }

  type Mutation{
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }

  type Query{
    getMessage(id: ID!): Message
  }
`)  

module.exports = { schema };

