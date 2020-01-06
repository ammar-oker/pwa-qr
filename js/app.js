//Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(() => { console.log('SW Registered 😎🔥') })
            .catch((err) => { console.log('SW Registration failed 😢', err) });
    });
}