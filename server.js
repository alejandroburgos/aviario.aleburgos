const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')

app.use(cors())

const port = 3001

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

app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

initDB()