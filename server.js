// modules
var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose 		= require('mongoose');
var db 				= require('./config/db');  //  Database configuration

// bodyParser() to extract request information
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// connect to database
mongoose.connect(db.url);

// routes
var router = express.Router();
require('./app/routes/item.model.route')(router); // configure routes
app.use('/api', router);

require('./app/routes/routes')(app);

// set the static files location /public/img will be /img for users

// startup our app at http://localhost:3001
var port = process.env.PORT || 3001;
app.listen(port);
console.log('Use port ' + port + ' to connect to this server');

// expose app
exports = module.exports = app;
