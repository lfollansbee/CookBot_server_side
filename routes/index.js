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
  console.log(req.query);
  var options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
    // qs:{
    //   query: 'bean dip',
    //   type: 'appetizer',
    //   cuisine: 'mexican',
    //   number: '15'
    // },
    qs: req.query,
    headers:{
      'cache-control': 'no-cache',
      'x-mashape-key': process.env.key
    }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if(!error && response.statusCode == 200){
      var parsed = JSON.parse(body);
      res.json(parsed);
    }
  });
})



module.exports = router;
