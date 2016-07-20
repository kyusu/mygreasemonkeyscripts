// ==UserScript==
// @name           The Gard Wiki "Keep Alive" script
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Calls the "Email Settings" periodically to keep the session alive
// @include         https://gard.telekom.de/gardwiki/*
// @version        1
// @noframes
// @run-at         document-end
// ==/UserScript==

(function () {
    var xhReq = new XMLHttpRequest();
    setInterval(function () {
        xhReq.open('GET', 'https://gard.telekom.de/gardwiki/users/viewmyemailsettings.action', true);
        xhReq.send(null);
    }, 300000);
})();
