importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBnpa9DGWxuagB8devIJ02wrfXKJGQH9Ic",
    authDomain: "helloworld-87777.firebaseapp.com",
    databaseURL: "https://helloworld-87777.firebaseio.com",
    projectId: "helloworld-87777",
    storageBucket: "helloworld-87777.appspot.com",
    messagingSenderId: "342939091174",
    appId: "1:342939091174:web:db2d6bdfd9bf04cab93b27",
    measurementId: "G-C4XHY5X831"
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



