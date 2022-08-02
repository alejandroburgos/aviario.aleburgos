const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const path = require('path');

app.use(cors())

const passport = require('passport')

app.use(passport.initialize())

app.use(require('./src/routes/auth.js'))

app.use((req, res, next) => {
    const error = new Error("Not founddddd");
    error.status = 404;
    next(error);
  });

if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.join(__dirname, "front/build")));
    // Handle React routing, return all requests to React app
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "front/build", "index.html"));
    });
  }


// cambio de puerto en heroku
let port = process.env.PORT;
if (port == null || port == "") {
port = 3001;
}
app.listen(port, function(){
    console.log("servidor de express funcionado");
})

initDB()