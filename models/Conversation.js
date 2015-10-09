//===================
//DECLARING VARIABLES
//===================

var mongoose = require( 'mongoose' )

//===============
//CREATING SCHEMA
//===============
var Conversation = new mongoose.Schema( {
	owner: String,
	group: String,
	topics: [ String ],
	location: String,
	latitude: Number,
	longitude: Number,
	isLive: Boolean
} )



//================
//EXPORTING SCHEMA
//================
module.exports = mongoose.model( 'Conversation', Conversation )