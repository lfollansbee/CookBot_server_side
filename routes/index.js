require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../db/queries');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Very Nice!'
  });
});

//SEARCH for recipes
router.get('/search', function(req, res, next){
  // console.log(req.query);
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
    qs: req.query,
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.TESTING_KEY
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }else{
      res.json({error, response})
    }
  });
})

router.get('/recipeId', function(req, res, next){
  var query = parseInt(req.query.id)
  // console.log("id: ", query);
  var recipeRequest = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + query + '/information',
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.TESTING_KEY
    }
  };
  request(recipeRequest, function (error, response, body) {
    if (error) throw new Error(error);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }
  });
})

router.get('/recipeInstructions', function(req, res, next){
  var query = parseInt(req.query.id)
  var recipeInstructions = {
    method: 'GET',
    url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + query + "/analyzedInstructions",
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.TESTING_KEY
    }
  };
  request(recipeInstructions, function (error, response, body) {
    if (error) throw new Error(error);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }
  });
})

router.get('/search/fridge', function(req, res, next){
  var strings = JSON.stringify(req.query.query)
  // console.log(strings);
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients',
    qs: {
      ingredients: strings,
      number: 12
    },
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.TESTING_KEY
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    // console.log(body);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }
  });
})

router.get('/saved', function(req, res, next){
  db.getSavedRecipes()
  .then(function(data){
    // console.log(data);
    res.json(data)
  })
})

module.exports = router;
