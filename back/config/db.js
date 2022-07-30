const moongose = require('mongoose');

const username = encodeURIComponent("sawer");
const password = encodeURIComponent("teniente-alex0");
const clusterUrl = "cluster0.wmrid.mongodb.net/web";
const authMechanism = "DEFAULT";

// const DB_URI = "mongodb+srv://cluster0.wmrid.mongodb.net/web";
const DB_URI =`mongodb+srv://${username}:${password}@${clusterUrl}`;

module.exports = () => {
    const connect = () => {
        moongose.connect(
            DB_URI, 
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
            }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('DB CONECTADA');
                }
            }
        )
    }

    connect();
}   