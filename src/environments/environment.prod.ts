import { config } from "config";

export const environment = {
  production: true,
  apiURL: config.apiUrl,
  firebase: {
    apiKey: "AIzaSyBnpa9DGWxuagB8devIJ02wrfXKJGQH9Ic",
    authDomain: "helloworld-87777.firebaseapp.com",
    databaseURL: "https://helloworld-87777.firebaseio.com",
    projectId: "helloworld-87777",
    storageBucket: "helloworld-87777.appspot.com",
    messagingSenderId: "342939091174",
    appId: "1:342939091174:web:db2d6bdfd9bf04cab93b27",
    measurementId: "G-C4XHY5X831"
  }
};