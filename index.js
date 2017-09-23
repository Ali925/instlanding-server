var express = require('express');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var request = require('request');
var cors = require('cors');
var app  = express();


var bodyParser = require('body-parser');
app.use(bodyParser());

app.use(cors());
app.set('port', (process.env.PORT || 5000));

app.post('/followUnfollow', function(req, res, next){

	var form = {
    	action: req.body.action
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: req.body.url,
    body: formData,
    method: 'POST'
  }, function (err, response, body) {
    //it works!
    res.json(body);	
  });
});

app.get('/latestMedia', function(req, res, next){
  request({
    uri: 'https://www.instagram.com/' + req.query.username + '/media/',
    method: 'GET'
  }, function (err, response, body) {
    //it works!
    console.log(response);
    res.json(body); 
  });
});

app.listen(app.get('port'), function(){
	console.log('Running on 5000!');
});
