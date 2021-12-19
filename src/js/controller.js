import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { loadRecipe } from './model.js';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipes = async function() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 0. Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());
    // 1. Loading recipe
    recipeView.renderSpinner();
    let index = -1;
    if (model.state.bookmarks) {
      index = model.state.bookmarks.findIndex(bookmark => bookmark.id === id);
    }
    if (index === -1) {
      await model.loadRecipe(id);
      const { recipe } = model.state;
      recipeView.render(model.state.recipe);
    }
    else {
      recipeView.render(model.state.bookmarks[index]);
    }

  } catch (err) {
      console.log(err);
      recipeView.renderError();
  }
}

const controlSearchResults = async function() {
  try {

    // Get searchquery
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    model.state.search.page = 1;

    // Load search results
    await model.loadSearchResults(query);

    // Render results
    resultsView.render(model.getSearchResultsPage(model.state.search.page));

    // Render pagination
    paginationView.render(model.state.search);
  } catch(err) {
      console.log(err);
  }
}

const controlPagination = function(changePage) {
  model.state.search.page = changePage;
  resultsView.render(model.getSearchResultsPage(model.state.search.page));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

// const controlBookmarks = function() {
//   bookmarksView.render(model.state.bookmarks);
//   //console.log(model.state.bookmarks);
// }

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerRender(controlPagination);
  //bookmarksView.addHandlerBookmarks(controlBookmarks);
};

init();
