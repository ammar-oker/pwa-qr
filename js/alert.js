alertify.dialog('myConfirm', function() {
    var settings;
    return {
        setup: function() {
            var settings = alertify.confirm().settings;
            for (var prop in settings)
                this.settings[prop] = settings[prop];
            var setup = alertify.alert().setup();
            // setup.buttons.push({
            //     text: '<u>C</u>opy to clipboard',
            //     key: 67 /*c*/ ,
            //     scope: 'ok',
            // });
            return setup;
        },
        settings: {
            oncontinue: null,
            // reverseButtons: true
        },
        callback: function(closeEvent) {
            if (closeEvent.index == 2) {
                if (typeof this.get('oncontinue') === 'function') {
                    returnValue = this.get('oncontinue').call(this, closeEvent);
                    if (typeof returnValue !== 'undefined') {
                        closeEvent.cancel = !returnValue;
                    }
                }
            } else {
                alertify.confirm().callback.call(this, closeEvent);
            }
        }
    };
}, false, 'confirm');

/// invoke the custom dialog
function showConfirm(text, onok, oncancel, oncontinue) {
    alertify
        .myConfirm(text)
        .set({
            'onok': onok,
            // 'oncontinue': oncontinue,
            'oncancel': oncancel,
            'labels': {
                'ok': 'Follow Link',
                // 'cancel': 'Close',
            },
            'reverseButtons': true,
            'position': 'bottom-center'
        }).setHeader('QR Detected')
}