var knex = require('./knex');

module.exports = {

  getSavedRecipeTitles: function() {
    return knex('recipe').select('title', 'dbID');
  },

  getSavedRecipe: function(id){
    return knex('recipe').select().where({dbID: id}).first()
  },

  getRecipeNotes: function(recipeId){
    return knex('note').select('note', 'id').where({recipe_id: recipeId})
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
  },
  addInstructions: function(object){
    var steps = object.id
    var spoonId = JSON.parse(object.originalID)
    var instructions = []
    for (var i = 1; i < steps.length; i++) {
      var thisStep = JSON.parse(steps[i])
      instructions.push(thisStep.step)
    }
    return knex('recipe').where({
      spoonacularID: spoonId.id}).update({
      extendedInstructions: JSON.stringify(instructions)
    })
  },
  deleteSavedRecipe: function(id){
    return knex('recipe').where({dbID: id}).del()
  },
  addNote: function(note, recipeId){
    return knex('note').insert({
      note: note,
      recipe_id: recipeId
    })
  },
  deleteRecipeNote: function(noteId){
    return knex('note').where({id: noteId}).del()
  }
};
