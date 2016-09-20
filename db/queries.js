var knex = require('./knex');

module.exports = {

  getSavedRecipeTitles: function() {
    return knex('recipe').select('title', 'dbID');
  },

  getSavedRecipe: function(id){
    return knex('recipe').select().where({dbID: id}).first()
  },

  addNewRecipe: function(recipe){
    var rec = JSON.parse(recipe.id)
    var ingredients = []
    for (var i = 0; i < rec.extendedIngredients.length; i++) {
      ingredients.push(rec.extendedIngredients[i].originalString)
    }

    return knex('recipe').insert({
      cookingMinutes: rec.cookingMinutes,
      dairyFree: rec.dairyFree,
      extendedIngredients: JSON.stringify(ingredients),
      extendedInstructions: JSON.stringify(['']),
      glutenFree: rec.glutenFree,
      spoonacularID: rec.id,
      image: rec.image,
      instructions: rec.instructions,
      preparationMinutes: rec.preparationMinutes,
      sourceName: rec.sourceName,
      source_url: rec.source_url,
      spoonacularSourceUrl: rec.spoonacularSourceUrl,
      readyInMinutes: rec.readyInMinutes,
      servings: rec.servings,
      title: rec.title,
      vegan: rec.vegan,
      vegetarian: rec.vegetarian,
      veryHealthy: rec.veryHealthy,
      veryPopular: rec.veryPopular
    })
  }

};

//
// addBook: function(newBook){
//   return knex('book').returning('id')
//   .insert({
//     title: newBook.title,
//     genre_id: newBook.genre_id,
//     description: newBook.description,
//     cover_url: newBook.cover_url
//   });
// },
