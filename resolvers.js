var Message = require("./Message");

var fakeDatabase = {};

var root = {
	// Map username to content
	getMessage({ id }){
		if(!fakeDatabase[id]){
			throw new Error("no message exists with id " + id)
		 }
		return new Message(id,fakeDatabase[id]);
	},

	createMessage({ input }){
		// Create a random id for our "database"
		var id = require("crypto").randomBytes(10).toString("hex");
		fakeDatabase[id] = input;
		return new Message(id,input);
	},

	updateMessage({ id, input }){
		if(!fakeDatabase[id]){
			throw new Error("no message exists with id " + id);
		}
		fakeDatabase[id] = input
		return new Message(id,input)
	},

}

module.exports = { root};
