// //===================
// //DECLARING VARIABLES
// //===================
// var express                 = require( 'express' )
// var apiRouter               = express.Router()
// var usersController         = require( '../../controllers/usersController.js' )
// //=========
// //ROUTES
// //=========

//   function authenticatedUser( req, res, next ) {
//     // If the user is authenticated, then we continue the execution
//     console.log( 'Got here' )
// 	if ( req.isAuthenticated() ) {
//         return next()
//     }

//     // Otherwise the request is always redirected to the home page
//     res.redirect( '/' )
//   }


// apiRouter.route( '/users' )
// 	.get( authenticatedUser, usersController.index )
// 	.post( authenticatedUser, usersController.create )

// apiRouter.route( '/users/:user_id' )
// 	.get( authenticatedUser, usersController.show )
// 	.patch( authenticatedUser, usersController.update )
// 	.delete( usersController.destroy )	
	
	
	
// module.exports = apiRouter