// modules =================================================
const express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
// set our port
const port = 3000;
// configuration ===========================================

// config files
var db = require('./config/db');
console.log("connecting to",db);
mongoose.connect(db.url); //Mongoose connection created

// middleware
app.use(bodyParser.urlencoded());

// frontend routes =========================================================
app.get('/', (req, res) => res.send('trackage time'));

// sample api route
// grab the package model we just created
var Package = require('./app/models/packages');
app.get('/api/packages', function(req, res) {
    // use mongoose to get all packages in the database
    Package.find(function(err, packages) {
        // if there is an error retrieving, send the error.
        // nothing after res.send(err) will execute
        if (err)
            res.send(err);
        console.log(`Get packages`);
        res.json(packages); // return all students in JSON format
    });
});

app.post('/api/packages/send', function (req, res) {
    var package = new Package(); // create a new instance of the package model
    console.log(req.body);
    package.code = req.body.code; // set the tracking code
    package.save(function(err) {
        if (err)
            res.send(err);
        console.log(`Added ${req.body.code}`);
        res.json({ message: 'package created!' });
    });
});

app.delete('/api/packages/:package_id', function (req, res) {
    Package.deleteOne({
       _id: req.params.package_id
    }, function(err) {
        if (err)
            res.send(err);
        console.log(`Deleted ${req.params.package_id}`);
        res.json({ message: `Successfully deleted!` });
    });
});

// startup our app at http://localhost:3000
app.listen(port, () => console.log(`trackage listening on port ${port}`));