const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const sequelize = require('./server/util/database');

app.use(express.static(path.join(__dirname, "/client/build")));
// console.log that your server is up and running

sequelize.sync().then(result =>{

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



app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
