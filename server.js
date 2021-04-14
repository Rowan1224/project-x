const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const paginate = require('express-paginate');
const sequelize = require('./server/util/database');
// toha
var session = require('express-session');
var http = require('http');
var Cookies = require('cookies');
var hash = require('object-hash');
const { Cookie } = require('cookies');
const cookieParser = require('cookie-parser');
var keys = ['keyboard cat'];
//
const serviceProviderRoutes = require('./server/routes/serviceProvider');
const bodyParser = require('body-parser');
app.use(paginate.middleware(10, 50));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:'1mb'}))
//toha
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, "/client/build")));
// console.log that your server is up and running

sequelize.sync({ force: false }).then(result =>{
    app.listen(port, () => console.log(`Listening on port ${port}`));
}).catch( err =>{
    console.log(err);
});


// create a GET route

app.get("/db_connection", (req, res) => {
	sequelize.authenticate()
	.then(function(err) {
	 res.send({ express: 'YOUR DB IS CONNECTED TO REACT' });
	}, function (err) {
	 res.send({ express: 'YOUR DB IS NOT CONNECTED TO REACT' });
	});
});



// Service Provider Side APIs

app.use(serviceProviderRoutes);
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
  });
// app.get('/*', (req, res) => {
// 	return res.redirect('/');
//   });
  





// app.get('/*', (req, res) => {
//   res.status(404).json({Name: "Page Not Found", Message: "Try a valid url!!!"});
// });
