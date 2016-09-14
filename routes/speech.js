require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');
var watson = require('watson-developer-cloud');
var fs = require('fs');


router.get('/speech', function(req, res, next){
  console.log("request: ", req.query);
  var text = req.query.text;
  var text_to_speech = watson.text_to_speech({
    username: process.env.watson_username,
    password: process.env.watson_password,
    version: 'v1'
  });
  var params = {
    text: text,
    voice: 'en-US_AllisonVoice',
    accept: 'audio/wav'
  };

  // Pipe the synthesized text to a file.
  // text_to_speech.synthesize(params).pipe(fs.createWriteStream('hello_world.wav'));
  var transcript = text_to_speech.synthesize(params)

  transcript.pipe(res)
})



module.exports = router;
