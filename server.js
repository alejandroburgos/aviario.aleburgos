const express = require('express')
const initDB = require('./config/db')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const path = require('path');

app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header( "Access-Control-Allow-Headers", "Origen, X-Requested-With, Content-Type, Accept");
    next();
});
const passport = require('passport')

// cambio de puerto en heroku
let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}

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

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(('/app/front/build')));
    console.log("hola")
    app.get('*', (req, res) => {
        res.sendFile(path.join('/app/front/build/index.html'));
    });
}

app.listen(port, () => {
    console.log('La aplicacion esta en linea!');
})

initDB()