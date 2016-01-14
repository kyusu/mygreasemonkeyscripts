// ==UserScript==
// @name           The Midgard "Copy issue id to clipboard" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Copies the issue id of the currently open issue to the clipboard
// @include        https://midgard.intra.t-online.de/gard/browse/*
// @version        1
// @noframes
// @grant          GM_setClipboard
// @run-at         document-end
// ==/UserScript==

(function () {
    var li = document.createElement('li');
    var anchor = document.createElement('a');
    anchor.href = '#';
    anchor.innerText = 'Copy issue id';
    anchor.className = 'aui-button';
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        var paths = window.location.pathname.split('/');
        GM_setClipboard(paths[paths.length - 1]);
    });
    li.appendChild(anchor);
    var header = document.querySelector('nav.aui-header ul.aui-nav');
    header.appendChild(li);
})();












