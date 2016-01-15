// ==UserScript==
// @name           The Midgard "Copy id & summary to clipboard" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Copies the issue id of the currently open issue to the clipboard
// @include        https://midgard.intra.t-online.de/gard/browse/*
// @version        1
// @noframes
// @grant          GM_setClipboard
// @run-at         document-end
// ==/UserScript==

(function () {
    var header = document.querySelector('nav.aui-header ul.aui-nav');
    var anchorFactory = function (label, clickCallback) {
        var anchor = document.createElement('a');
        anchor.href = '#';
        anchor.innerText = label;
        anchor.className = 'aui-button';
        anchor.addEventListener('click', clickCallback);
        return anchor;

    };
    var addAnchor = function (anchor) {
        var li = document.createElement('li');
        li.appendChild(anchor);
        header.appendChild(li);
    };
    var getId = function () {
        var paths = window.location.pathname.split('/');
        return paths[paths.length - 1];
    };
    var copyIdAnchor = anchorFactory('Copy id', function (e) {
        e.preventDefault();
        GM_setClipboard(getId());
    });
    var copySummaryAnchor = anchorFactory('Copy summary', function (e) {
        e.preventDefault();
        var header = document.getElementById('summary-val').innerText;
        var summary = getId() + ' ' + header;
        GM_setClipboard(summary);
    });
    addAnchor(copyIdAnchor);
    addAnchor(copySummaryAnchor);
})();












