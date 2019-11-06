'use strict'

var imgFilters = document.querySelector('.img-filters');
var popularFilter = document.querySelector('#filter-popular');
var randomFilter = document.querySelector('#filter-random');
var discussedFilter = document.querySelector('#filter-discussed');

var setFilter = function() {
  imgFiltersElement.classList.remove('img-filters--inactive');
  return;
};
