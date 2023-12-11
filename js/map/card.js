const TYPES = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const template = document.querySelector('#card');
const container = document.querySelector('#map-canvas');

const renderFeatures = (card, features) => {
  const featuresList = card.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    const isNecessary = features.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureItem.remove();
    }
  });
};

const renderPhotos = (card, photos) => {
  const photosList = card.querySelector('.popup__photos');
  photos.forEach((photoUrl) => {
    const photo = card.querySelector('.popup__photo').cloneNode(true);
    photo.src = photoUrl;
    photosList.append(photo);
  });
  card.querySelectorAll('.popup__photo')[0].remove();
};

const createCard = (properties) => {
  const {offer, author} = properties;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;
  const card = template.content.querySelector('.popup').cloneNode(true);
  card.querySelector('.popup__title').textContent = title;
  card.querySelector('.popup__text--address').textContent = `${address.lat} ${address.lng}`;
  card.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES[type];
  card.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  card.querySelector('.popup__description').textContent = description;
  renderFeatures(card, features);
  renderPhotos(card, photos);
  card.querySelector('.popup__avatar').src = author.avatar;
  return card;
};

const renderCard = (data, index) => {
  const currentCard = data[index];
  container.append(createCard(currentCard));
};

export { renderCard };
