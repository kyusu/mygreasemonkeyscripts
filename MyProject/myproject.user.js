// ==UserScript==
// @name           the myproject improvement initiative
// @namespace      https://myproject.telekom.de/pi/projects/relaunch-telefonie-center/wiki/Userscript
// @description    Adds missing features and remedies annoyances
// @include        https://myproject.telekom.de/*
// @match          https://myproject.telekom.de/*
// ==/UserScript==

// The script should only execute in the top frame, not in iFrames.
if (top.location.href === window.location.href) {
    (function () {
        var scriptURI = 'https://myproject.telekom.de/pi/attachments/{hash}/download/myproject.js',
            cssURI = 'https://myproject.telekom.de/pi/attachments/{hash}/download/myproject.css',
            script = document.createElement('script'),
            link = document.createElement('link');

        // Inject css file
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", cssURI);
        document.body.appendChild(link);

        // Inject script file
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', scriptURI);
        document.body.appendChild(script);
    }());
}
