import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAxomPcdjUYjos_6-Vcjj07sazCVpoQBHE',
  authDomain: 'beer-collection.firebaseio.com/',
  databaseURL: 'https://beer-collection.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
