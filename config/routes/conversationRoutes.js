//===================
//DECLARING VARIABLES
//===================
var express                 = require( 'express' )
var apiRouter               = express.Router()
var conversationsController = require( '../../controllers/conversationsController.js' )
//=========
//ROUTES
//=========

 function authenticatedUser( req, res, next ) {
    // If the user is authenticated, then we continue the execution
    if ( req.isAuthenticated() ) {
        console.log( "USer authenticated!")
        return next();
    }
    console.log("Nope!")
    // Otherwise the request is always redirected to the home page
    res.redirect( '/' );
  }

apiRouter.route( '/conversations' )
	.get( authenticatedUser, conversationsController.index )
	.post( authenticatedUser, conversationsController.create )

apiRouter.route( '/conversations/:convo_id' )
	.get( authenticatedUser, conversationsController.show )
	.patch( authenticatedUser, conversationsController.update )
	.delete( authenticatedUser, conversationsController.destroy )	
	
	
	
module.exports = apiRouter