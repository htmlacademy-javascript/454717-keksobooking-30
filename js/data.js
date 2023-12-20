import { getRandomFloat, getRandomInteger, getRandomNumberOfRandomElements } from './utilities';

const MIN_LATITUDE = 35.65;
const MAX_LATITUDE = 35.7;
const MIN_LONGITUDE = 139.7;
const MAX_LONGITUDE = 139.8;

const createRandomAuthor = (currentIndex) => ({
  avatar: `img/avatars/user${currentIndex.toString().padStart(2, '0')}.png`,
});

const createRandomLocation = () => ({
  lat: getRandomFloat(MIN_LATITUDE, MAX_LATITUDE).toFixed(5),
  lng: getRandomFloat(MIN_LONGITUDE, MAX_LONGITUDE).toFixed(5),
});

const createRandomOffer = (currentIndex, location) => {
  const titles = ['Предложение 1', 'Предложение 2', 'Предложение 3', 'Предложение 4', 'Предложение 5', 'Предложение 6', 'Предложение 7', 'Предложение 8', 'Предложение 9', 'Предложение 10'];
  const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const checkinHours = ['12:00', '13:00', '14:00'];
  const checkoutHours = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const descriptions = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8', 'Описание 9', 'Описание 10'];
  const photoUrls = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

  const offer = {
    title: titles[currentIndex],
    address: location,
    price: getRandomInteger(0, 100000),
    type: types[getRandomInteger(0, 4)],
    rooms: getRandomInteger(1, 100),
    guests: getRandomInteger(1, 100),
    checkin: checkinHours[getRandomInteger(0, 2)],
    checkout: checkoutHours[getRandomInteger(0, 2)],
    features: getRandomNumberOfRandomElements(features),
    description: descriptions[currentIndex],
    photos: getRandomNumberOfRandomElements(photoUrls),
  };
  return offer;
};

const createAnnouncementsData = (announcementsCount = 10) => {
  const announcementsData = new Array(announcementsCount).fill(1).map((start, index) => {
    const location = createRandomLocation();
    return {
      author: createRandomAuthor(start + index),
      offer: createRandomOffer(index, location),
      location: location,
    };
  });
  return announcementsData;
};

export { createAnnouncementsData };
