// ==UserScript==
// @name           The Gard "Copy id, summary & branch name to clipboard" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Copies the issue id of the currently open issue to the clipboard
// @include        https://gard.telekom.de/gard/browse/*
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
    var getHeader = function () {
        return document.getElementById('summary-val').innerText;
    };
    var handleClick = function (getClipboardData, e) {
        e.preventDefault();
        GM_setClipboard(getClipboardData());
    };
    var getSummary = function () {
        return getId() + ' ' + getHeader();
    };
    var replaceInvalidCharacters = function (value) {
        return value.replace(/[^a-z|A-Z|0-9|-]/g, '-');
    };
    var compose = function (f, g) {
        return function (x) {
            return f(g(x));
        }
    };

    var copyIdAnchor = anchorFactory('Copy id', handleClick.bind(null, getId));
    var copySummaryAnchor = anchorFactory('Copy summary', handleClick.bind(null, getSummary));
    var copyBranchNameAnchor = anchorFactory('Copy branch name', handleClick.bind(null, compose(replaceInvalidCharacters, getSummary)));

    addAnchor(copyIdAnchor);
    addAnchor(copySummaryAnchor);
    addAnchor(copyBranchNameAnchor);
})();












