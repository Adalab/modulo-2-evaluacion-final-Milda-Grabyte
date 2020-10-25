function visualise() {
  let resultsContainer = selectClass('.js-results__list');
  resultsContainer.innerHTML = '';
  for (let movie of searchResults) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const seriesTitle = document.createElement('h3');
    listItem.setAttribute('class', 'js-results__list--item');
    listItem.setAttribute('id', movie.id);
    listItem.dataset.sourceObject = JSON.stringify(movie);
    resultsContainer.appendChild(listItem);
    image.setAttribute('class', 'results__list--item__img js-results__list--item__img');
    image.src = movie.imageSource;
    seriesTitle.setAttribute('class', 'results__list--item__title js-results__list--item__title');
    seriesTitle.innerHTML = movie.name; // createTextNode da un error
    listItem.append(image, seriesTitle); // More than one DOM node
    resultsContainer.appendChild(listItem);
    feedback(resultsContainer);
  }
}
