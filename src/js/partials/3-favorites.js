// Generate favorite series list
function addToFavorites(event) {
  const favorites = selectClass('.js-favorites');
  const favoritesList = selectClass('.js-favorites__list');
  favorites.classList.remove('hidden');
  const clickedSeries = event.currentTarget;
  const clickedSeriesId = parseInt(clickedSeries.id);
  const isFavorite = favoriteSeries.findIndex((item) => {
    return item.id === clickedSeriesId;
  });

  clickedSeries.classList.toggle('favorite');
  // Check if a series is in the favorites list
  if (isFavorite === -1) {
    const parsedSourceObject = JSON.parse(clickedSeries.dataset.sourceObject);
    favoriteSeries.push(parsedSourceObject); //me lo metía con comillas (string);
    generateFavoritesDOM(favoritesList, favoriteSeries, parsedSourceObject);
    saveFavorites(favoriteSeries);
  } else {
    // El segundo click elimina de favoritos
    const item = favoriteSeries.findIndex((item) => {
      if (item.id === clickedSeriesId) {
        return item;
      }
    });
    removeFavorite(favoriteSeries, item);
  }
}

// Pick one item from the visualised search results
function listenToSeries() {
  const series = document.querySelectorAll('.js-results__list--item');
  for (const item of series) {
    item.addEventListener("click", addToFavorites);
  }
}