// ==UserScript==
// @name           The Gard "Keep Alive" script
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Calls the "Create Issue" periodically to keep the session alive
// @include        https://gard.telekom.de/gard/*
// @version        1
// @noframes
// @run-at         document-end
// ==/UserScript==

(function () {
    var xhReq = new XMLHttpRequest();
    setInterval(function () {
        xhReq.open('GET', 'https://gard.telekom.de/gard/secure/CreateIssue!default.jspa', true);
        xhReq.send(null);
    }, 300000);
})();
