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
schemaType{
  constructor(fakeDatabase){
    this.fakeDatabase = fakeDatabase;

    // Map username to content
    getMessage({id}){
      if(!this.fakeDatabase[id]){
        throw new Error("no message exists with id " + id)
       }
      return new Message(id,fakeDatabase[id]);
    }

  createMessage({input}){
    // Create a random id for our "database"
    var id = require("crypto").randomBytes(10).toString("hex");
    this.fakeDatabase[id] = input;
    return new Message(id.input);
  }

  updateMessage({ id, input }){
    if(!this.fakeDatabase[id]){
      throw new Error("no message exists with id " + id);
    }
    // This replaces all old data, but some apps might want partial
    // update
    this.fakeDatabase[id] = input;
    return new Message(id,input);
  }
} 

var root = {
  getMessage(id),
  createMessage({input}),
  updateMessage({id,input}),
}

module.exports = { schema,root };
