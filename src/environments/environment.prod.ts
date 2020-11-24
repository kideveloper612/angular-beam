import { config } from "config";

export const environment = {
  production: true,
  apiURL: config.apiUrl,
  firebase: {
    apiKey: "AIzaSyCrhKQrvxm9mVTpwyrZZZp-dBWQANGdOeo",
    authDomain: "push-notifications-cc667.firebaseapp.com",
    databaseURL: "https://push-notifications-cc667.firebaseio.com",
    projectId: "push-notifications-cc667",
    storageBucket: "push-notifications-cc667.appspot.com",
    messagingSenderId: "740226695970",
    appId: "1:740226695970:web:7b6664526a7e4e4807db7b",
    measurementId: "G-J88SVY2G3H"
  }
};