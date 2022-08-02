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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('front/build'))
    app.get('*', (req, res) => {
        res.sendFile( 'front/build/index.html');
    })
}

// cambio de puerto en heroku
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

initDB()