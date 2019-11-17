const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const mongodb = require("./config/database.js")
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
app.listen(8000, () => {
    MongoClient.connect(mongodb.url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
          console.log("HERE IS THE ERROR")
            throw error;
        }
        db = client.db(mongodb.dbName);
        require('./routes.js')(app,db);
    });
});
