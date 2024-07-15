var author = "andy"
var content = "hope is a good thing"
var query = /* GraphQL */` mutation CreateMessage($input: MessageInput){
  createMessage(input: $input){
    
