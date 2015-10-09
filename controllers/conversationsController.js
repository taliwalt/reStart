// ===================
// DECLARING VARIABLES
// ===================
var Conversation = require( '../models/Conversation.js' )

// ==============
// CRUD FUNCTIONS
// ==============

// grab all conversations
function index ( req, res ) {
  Conversation.find( function ( error, conversations ) {
    if ( error ) {
      res.json( error )
    } else {
      res.json( conversations )
    }
  } )
}

// make a new conversation
function create ( req, res ) {
  console.log("It's in here")
	console.log( req.user )
  var conversation = new Conversation()
  // Setting conversation properties
  console.log( "REqBody")
  console.log( req.body )
  console.log( req.user )
  conversation.owner_id = req.user.fb.id
	conversation.owner  = req.user.fb.firstName
  conversation.topics = req.body.topic
  conversation.group  = req.body.group
  console.log( "Lat")
  console.log( req.body.latitude )
  conversation.latitude = req.body.latitude
  conversation.longitude = req.body.longitude
  conversation.isLive = true

  // check if conversation saved
  conversation.save( function ( error ) {
    if ( error ) {
      res.json( error )
    } else {
			console.log("Convo SAVED")
			console.log( conversation )
      res.json( conversation )
    }
  } )
}

// show a specific conversation
function show ( req, res ) {
  Conversation.findOne(req.params.convo_id, function ( error, convo ) {
    if ( error ) {
      res.json( error )
    } else {
      res.json( convo )
    }
  } )
}

// update attributes of selected conversation
function update ( req, res ) {
  Conversation.findOne(req.params.convo_id, function ( error, convo ) {
    if ( error ) {
      res.json(error)
    } else {
      // change attributes
      convo.owner    = req.body.owner       || convo.owner
      convo.group    = req.body.group       || convo.group
      convo.topics   = req.body.topics      || convo.topics
      convo.location = req.body.location    || convo.location
      convo.latitude = req.body.latitude    || convo.latitude
      convo.longitude = req.body.longitude    || convo.longitude
      console.log(convo.owner)
      convo.save(function ( error ) {
        if ( error ) {
          res.json( error )
        } else {
          res.json( convo )
        }
      } )
    }
  } )
}

// remove a conversation from database
function destroy ( req, res ) {
  Conversation.findById(req.params.convo_id, function ( error, convo ) {
    if ( error ) {
      res.json( error )
    } else {
      res.json( 'Conversation deleted' )
    }
  } )
}

// =========
// EXPORTS
// ==========

module.exports = {
  index   : index,
  create  : create,
  show    : show,
  update  : update,
  destroy : destroy
}
