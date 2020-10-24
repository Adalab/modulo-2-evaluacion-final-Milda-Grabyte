'use strict';

// Class selector
function selectClass(className) {
  return document.querySelector(className);
}

// Console log function
function feedback(element) {
  return console.log(element);
}

const button = selectClass('.js-button');
const input = selectClass('.js-search-field');

let searchResults = [];

function getMovieData() {
  const inputValue = input.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputValue)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let movie = {};
        movie.name = data[i].show.name;
        if (data[i].show.image === null) {
          movie.imageSource = 'https://via.placeholder.com/210x295/ffffff/666666/?%20text=TV';
        } else if (data[i].show.image.medium === null) {
          movie.imageSource = data[i].show.image.original;
        } else {
          movie.imageSource = data[i].show.image.medium;
        }
        feedback(movie);
        searchResults.push(movie);
      }
      feedback(searchResults.length);
    });
}

// Click event
button.addEventListener('click', getMovieData);
