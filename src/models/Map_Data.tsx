/* eslint-disable prettier/prettier */
const Images = [
  {image: require('../assets/banners/food-banner1.jpg')},
  {image: require('../assets/banners/food-banner2.jpg')},
];

export const markers = [
  {
    coordinate: {
      latitude: 20.482555994005892,
      longitude: -103.53239031294561,
    },
    title: 'Coffee Win',
    description: 'This is the best food place',
    image: Images[0].image,
    rating: 4,
    reviews: 99,
  },
  {
    coordinate: {
      latitude: 22.6345648,
      longitude: 88.4377279,
    },
    title: 'Second Amazing Food Place',
    description: 'This is the second best food place',
    image: Images[1].image,
    rating: 5,
    reviews: 102,
  },
];

export const mapStandardStyle = [
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];
