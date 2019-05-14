require( 'dotenv' ).config()

const express = require( 'express' ),
  app = express(),
  port = 3000,
  mongoose = require( 'mongoose' ),
  cors = require( 'cors' ),
  routes = require( './routes/index' ),
  bodyParser = require( 'body-parser' )

app.use( cors() )
app.use( express.urlencoded( {
  extended: false
} ) )

app.use( bodyParser.json( {
  limit: "2mb"
} ) )

app.use( express.json() )

mongoose.connect( process.env.MINIWP_DB, {
  useNewUrlParser: true
} )

var db = mongoose.connection;
db.on( 'error', console.error.bind( console, 'connection error:' ) );
db.once( 'open', function callback() {
  console.log( "success connect to atlas" );
} );


app.use( "/", routes )

app.listen( port, () => {
  console.log( 'listening on port', port )
} )