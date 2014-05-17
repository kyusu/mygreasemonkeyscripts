// ==UserScript==
// @name        Web.de - anti news
// @description Removes all news from web.de
// @include        *://web.de/*
// @match          *://web.de/*
// ==/UserScript==


(function () {
    var cssURI = 'http://tmp.brakeless.de/greasemonkey/web.de.css';
    var link = document.createElement('link');

    // Inject css file
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", cssURI);
    document.body.appendChild(link);
}());
