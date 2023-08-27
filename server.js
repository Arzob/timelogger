var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/timelogger');

var Time = require('./model/time');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',async function(req,res)
{
    try{
        var t = new Time();
        const time = new Date().toLocaleTimeString();
        t.time = time;
        //res.send(time);
        await t.save();
    var time_entries =  await Time.find({},{time:1,_id:-1});
        var results = [];
        for (const time_entry of time_entries)
            {
                results.push({
                    time: time_entry.time 
                });
            }
        res.send(results);
    }
    catch (err){
        res.status(500).send({error :"Could not fetch current time"});
    }
    
});

app.listen(3000,function(){
   console.log("timelogger running on port 3000"); 
});