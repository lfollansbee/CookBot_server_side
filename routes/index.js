require('dotenv').config();
var express = require('express');
var router = express.Router();
var request = require('request');

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
      'x-mashape-key': process.env.key
    }
  };
  request(options, function (error, response, body) {
    response.addHeader("Access-Control-Allow-Origin", "*");
    if (error) throw new Error(error);
    // console.log(body);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
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
      'x-mashape-key': process.env.key
    }
  };
  request(recipeRequest, function (error, response, body) {
    response.addHeader("Access-Control-Allow-Origin", "*");
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
      'x-mashape-key': process.env.key
    }
  };
  request(recipeInstructions, function (error, response, body) {
    response.addHeader("Access-Control-Allow-Origin", "*");
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
      number: 10
    },
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.key
    }
  };
  request(options, function (error, response, body) {
    response.addHeader("Access-Control-Allow-Origin", "*");
    if (error) throw new Error(error);
    // console.log(body);
    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }
  });
})



module.exports = router;
