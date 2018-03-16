// Note: The code below was written with the help of
// a Google Developers Lab which can be found at:
// https://developers.google.com/web/ilt/pwa/lab-scripting-the-service-worker
(function () {
    'use strict';

    if (!('serviceWorker' in navigator)) {
        console.log('Service worker not supported');
        return;
    }
    navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registered at scope:', registration.scope);
        })
        .catch(function (error) {
            console.log('Registration failed:', error);
        });

})();