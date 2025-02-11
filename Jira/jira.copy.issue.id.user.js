// ==UserScript==
// @name           The Jira "Copy id, summary & branch name to clipboard" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Copies the issue id, issue title or a combination of both of the currently open issue to the clipboard
// @include        https://*.atlassian.net/browse/*
// @include        https://jira.breuni.io/browse/ENTD-*
// @include        https://jira.breuni.io/browse/RECO-*
// @version        1
// @noframes
// @grant          GM_setClipboard
// @run-at         document-end
// @require        https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js
// ==/UserScript==

(function () {
  
    var header = document.querySelector('#header > nav > div > div.aui-header-primary > ul');

    var anchorFactory = function (label, title, clickCallback) {
        var anchor = document.createElement('a');
        anchor.href = '#';
        anchor.innerText = label;
        anchor.title = title;
        anchor.className = 'aui-button aui-button-primary aui-style ';
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
        return `${getId()}-${replaceInvalidCharacters(getHeader())}`;
    };
    var replaceInvalidCharacters = function (value) {
        return _.kebabCase(value.replace(/\[Story|BUG|ESTIMATION|AUFGABE\]/g,''))
    };

    var copyIdAnchor = anchorFactory('🆔', 'Copy ticket id into your clipboard', handleClick.bind(null, getId));
    var copySummaryAnchor = anchorFactory('📜', 'Copy ticket summary into your clipboard', handleClick.bind(null, getSummary));
    var copyBranchNameAnchor = anchorFactory('⑂', 'Copy ticket summary as valid Git branch name into your clipboard', handleClick.bind(null, getSummary));

    addAnchor(copyIdAnchor);
    addAnchor(copySummaryAnchor);
    addAnchor(copyBranchNameAnchor);
})();
