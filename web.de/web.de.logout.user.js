// ==UserScript==
// @name        Web.logout.de - anti news
// @description Removes all news from web.de logout page
// @include        *://logout.webde.uimserv.net/*
// @match          *://logout.webde.uimserv.net/*
// ==/UserScript==


(function () {
    var cssURI = 'http://tmp.brakeless.de/greasemonkey/web.de.logout.css';
    var link = document.createElement('link');

    // Inject css file
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", cssURI);
    document.body.appendChild(link);
}());
