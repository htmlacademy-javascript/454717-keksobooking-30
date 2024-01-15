const types = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const template = document.querySelector('#card');

const renderFeatures = (features, featuresData) => {
  features.forEach((featureItem) => {
    const isNecessary = featuresData.some((feature) => featureItem.classList.contains(`popup__feature--${feature}`));
    if (!isNecessary) {
      featureItem.remove();
    }
  });
};

const renderPhotos = (photosList, photos) => {
  photos.forEach((photoUrl) => {
    const photo = photosList.querySelector('.popup__photo').cloneNode(true);
    photo.src = photoUrl;
    photosList.append(photo);
  });
  photosList.querySelectorAll('.popup__photo')[0].remove();
};

const createCard = (properties) => {
  const card = template.content.querySelector('.popup').cloneNode(true);
  const description = card.querySelector('.popup__description');
  const title = card.querySelector('.popup__title');
  const address = card.querySelector('.popup__text--address');
  const price = card.querySelector('.popup__text--price');
  const type = card.querySelector('.popup__type');
  const capacity = card.querySelector('.popup__text--capacity');
  const time = card.querySelector('.popup__text--time');
  const avatar = card.querySelector('.popup__avatar');
  const featuresList = card.querySelector('.popup__features');
  const features = card.querySelectorAll('.popup__feature');
  const photosList = card.querySelector('.popup__photos');

  const {offer, author} = properties;
  title.textContent = offer.title;
  address.textContent = offer.address;
  price.textContent = `${offer.price} ₽/ночь`;
  type.textContent = types[offer.type];
  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  if (offer.description?.length) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }
  if (offer.features?.length) {
    renderFeatures(features, offer.features);
  } else {
    featuresList.remove();
  }
  if (offer.photos?.length) {
    renderPhotos(photosList, offer.photos);
  } else {
    photosList.remove();
  }
  avatar.src = author.avatar;
  return card;
};

export { createCard };
