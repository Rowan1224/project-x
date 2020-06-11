const path = require("path");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "/client/build")));
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
