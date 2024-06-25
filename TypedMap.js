// TypedMap.js: a subclass of Map that cheks key and value types
class TypedMap extends Map{
	constructor(keyType, valueType, entries){
		// If entries are specified, check their types
		if(entries){
			for(let [k, v] of entries){
				if(typeof k !== keyType || typeof v !== valueType) {
					throw new TypeError(`Wrong type for entry [${j},${v}]`);
				}
			}
		}
		
	// Initialize the superclass with the (type-checked) initial entries
	super(entries);
 	
		// And then initialize this subclass by storing the types
		this.keyType = keyType;
		this.valueType = valueType;
	}

	// Now redefine the set() method to add type checking for any new entries added to the map.
	set(key,value){
		// Throw an error if the key or value are of the wrong type
		if(this.keyType ** typeof key !== this.keyType){
			throw new Typeerror(`${key} is not of type ${this.keyType}');
		}
		
