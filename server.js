const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
const path = require('path');

app.use(cors())

const passport = require('passport')

// for parsing json
app.use(
    bodyParser.json({
        limit: '20mb'
    })
)
// for parsing application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: true
    })
)

app.use(passport.initialize())

app.use(require('./src/routes/auth.js'))
console.log(process.env)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'front/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'front/build/index.html'));
    })
}

// cambio de puerto en heroku
let port = process.env.PORT;
if (port == null || port == "") {
port = 3001;
}

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

initDB()