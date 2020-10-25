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

function onClick() {
  getSeriesData();
}

// Click event
button.addEventListener('click', onClick);