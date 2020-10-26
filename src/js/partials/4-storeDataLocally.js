function saveFavorites(favoriteSeries) {
  localStorage.setItem('Favorite series', JSON.stringify(favoriteSeries));
}

function loadFavorites() {
  const favoritesLoaded = JSON.parse(localStorage.getItem('Favorite series'));
  let favoriteSeries;
  if (favoritesLoaded === null) {
    favoriteSeries = [];
  } else {
    favoriteSeries = favoritesLoaded;
  }
  return favoriteSeries;
}

// Click event
button.addEventListener('click', getSeriesData);

// Enter key triggers click event
input.addEventListener('keydown', function (event) {
  if (event.code === 'Enter') {
    event.preventDefault();
    event.stopPropagation();
    button.click();
  }
});