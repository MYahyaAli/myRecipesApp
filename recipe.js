const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true // this will automatically add createdAt and updatedAt fields
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;