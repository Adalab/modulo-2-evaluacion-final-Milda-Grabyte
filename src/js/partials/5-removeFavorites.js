function generateFavoritesDOM(list, favoriteSeries, item) {
  const listItem = document.createElement('li');
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.setAttribute('class', 'favorites__list--item__btn js-favorites__list--item__btn');
  const cancelImage = document.createElement('img');
  cancelImage.src = './assets/images/close-button.png';
  cancelImage.setAttribute('class', 'favorites__list--item__btn-img js-favorites__list--item__btn-img');
  cancelButton.appendChild(cancelImage);
  listItem.appendChild(cancelButton);
  listItem.setAttribute('class', 'favorites__list--item js-favorites__list--item');
  const image = document.createElement('img');
  image.setAttribute('class', 'favorites__list--item__img js-favorites__list--item__img');
  image.src = item.imageSource;
  const seriesTitle = document.createElement('h4');
  seriesTitle.setAttribute('class', 'favorites__list--item__title js-favorites__list--item__title');
  seriesTitle.innerHTML = item.name;
  listItem.append(image, seriesTitle);
  list.appendChild(listItem);

  cancelButton.addEventListener('click', (event) => {
    const itemPosition = favoriteSeries.indexOf(item);
    favoriteSeries.splice(itemPosition, 1);
    feedback(favoriteSeries);
    saveFavorites(favoriteSeries);
    visualiseFavorites();
  });
}



