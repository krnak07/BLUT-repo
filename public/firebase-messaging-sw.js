if( 'function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');

    importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');

    firebase.initializeApp({
        apiKey: "AIzaSyARrRzk-qumZ7fAHD6y9NpTrEaT2q8lD5k",
        authDomain: "blut-110799.firebaseapp.com",
        databaseURL: "https://blut-110799.firebaseio.com",
        projectId: "blut-110799",
        storageBucket: "blut-110799.appspot.com",
        messagingSenderId: "715930854454",
        appId: "1:715930854454:web:b4f14841505dee51"

    });
    let messaging = firebase.messaging();
    messaging.setBackgroundMessageHandler(function(payload) {
        // Customize notification here
        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.content,
        };

        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });
}
