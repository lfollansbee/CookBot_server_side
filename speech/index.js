require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');



var watson = require('watson-developer-cloud');
var fs = require('fs');

var text_to_speech = watson.text_to_speech({
  username: '{username}',
  password: '{password}',
  version: 'v1'
});

var params = {
  text: 'Hello world.',
  voice: 'en-US_AllisonVoice',
  accept: 'audio/wav'
};

// Pipe the synthesized text to a file.
text_to_speech.synthesize(params).pipe(fs.createWriteStream('hello_world.wav'));


module.exports = router;
