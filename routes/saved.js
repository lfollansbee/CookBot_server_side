require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../db/queries');



router.get('/', function(req, res, next){
  db.getSavedRecipeTitles()
  .then(function(data){
    // console.log(data);
    res.json(data)
  })
})


router.post('/add', function(req, res, next){
  var object = req.query
  db.addNewRecipe(object)
  .then(function(){
    res.json("success")
  })
})


router.get('/:id', function(req, res, next){
  console.log(req.params);
  db.getSavedRecipe(req.params.id)
  .then(function(data){
    // console.log(data);
    res.json(data)
  })
})

module.exports = router;
