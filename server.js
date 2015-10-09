//===================
//DECLARING VARIABLES
//===================
var express        = require( 'express' )
var User           = require( './models/User.js' )
var app            = express()
var path           = require( "path" )
var logger         = require( "morgan" )
var bodyParser     = require( "body-parser" )
var convoRouter    = require( './config/routes/conversationRoutes.js' )
var usersRouter    = require( './config/routes/userRoutes.js' )
var mongoose       = require( "mongoose" )
var passport       = require( "passport" )
var expressSession = require( "express-session" )
var cookieParser   = require( "cookie-parser" )
var PORT           = process.env.PORT || 3000
var DB             = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/fogo'



//================
//ROUTING
//================
// Mongoose Setup
mongoose.connect( DB )


app.use( function( req, res, next ) {
  global.user = req.user
  next()  
} )


//=================
// MIDDLEWARE
//=================
app.use( cookieParser() )
app.use(
	expressSession( {
		secret: 'mySecretKey',
		resave: true,
		saveUninitialized: true
	} )
)

app.use( function( req, res, next ) {
  console.log( "User" )
  console.log( req.user )
  next()  
} )

//Sets up passport
app.use( passport.initialize() )
app.use( passport.session() )

//Logs on server and json parsing on input
app.use( logger( 'dev' ) )
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )

app.set( 'views', path.join( __dirname, 'views' ) )
app.engine( 'ejs', require( 'ejs' ).renderFile )
app.set( 'view engine', 'ejs' )

app.use( express.static( __dirname + '/views' ) )

// Setting up the Passport Strategies
require( './config/passport' )( passport );


//Test route
app.get( '/', function( req, res ) {
    console.log( "1")
    console.log( req.user )
    res.render( 'login.ejs', { user: req.user } )
} )

//Path to authenticate user
app.get(  '/auth/facebook', passport.authenticate( 'facebook', { scope: 'email' } ) )

//Path called after user gets back from facebook
app.get( '/auth/facebook/callback',
    passport.authenticate( 'facebook', { 
        successRedirect: '/',
        failureRedirect: '/'
    } )
)

//Path to log user out
app.get( '/logout', function( req, res ) {
    req.logout()
    res.redirect( '/' )
} )



app.use( '/api', convoRouter )
app.use( '/api', usersRouter )

app.listen( PORT )