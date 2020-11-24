importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCrhKQrvxm9mVTpwyrZZZp-dBWQANGdOeo",
    authDomain: "push-notifications-cc667.firebaseapp.com",
    databaseURL: "https://push-notifications-cc667.firebaseio.com",
    projectId: "push-notifications-cc667",
    storageBucket: "push-notifications-cc667.appspot.com",
    messagingSenderId: "740226695970",
    appId: "1:740226695970:web:7b6664526a7e4e4807db7b",
    measurementId: "G-J88SVY2G3H"
});
const messaging = firebase.messaging();

// self.addEventListener('push', async function (event) {
//     event.waitUntil(
//         self.registration.showNotification('title', {
//             body: 'body'
//         })
//     );
// });
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    self.clients.matchAll(/* search options */).then((clients) => {
        console.log(clients);
        if (clients && clients.length) {
            // you need to decide which clients you want to send the message to..
            const client = clients[0];
            client.postMessage(payload);
        }
    })

    // self.addEventListener('background-message', function (event) {
    //     event.ports[0].postMessage(payload);
    // });
});

// self.addEventListener('push', function (event) {
//     // event.notification.close();

//     // var promise = new Promise(function (resolve) {
//     //     setTimeout(resolve, 500);
//     // }).then(function () {
//     //     return clients.openWindow(event.notification.data);
//     // });
//     // event.waitUntil(promise);
//     self.clients.matchAll(/* search options */).then((clients) => {
//         if (clients && clients.length) {
//             // you need to decide which clients you want to send the message to..
//             const client = clients[0];
//             client.postMessage(payload);
//         }
//     })
// });

// messaging.setBackgroundMessageHandler(function (payload) {

//     var notificationTitle = payload.data.title;
//     var notificationOptions = {
//         body: payload.data.body,
//         icon: payload.data.icon,
//         locator: payload.data.locator
//     };
//     return self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });



