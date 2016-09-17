var knex = require('./knex');

module.exports = {

  getSavedRecipes: function() {
    return knex('recipe').select();
  }

};
