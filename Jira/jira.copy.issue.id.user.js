// ==UserScript==
// @name           The Jira "Copy id, summary & branch name to clipboard" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Copies the issue id, issue title or a combination of both of the currently open issue to the clipboard
// @include        https://*.atlassian.net/browse/*
// @version        1
// @noframes
// @grant          GM_setClipboard
// @run-at         document-end
// ==/UserScript==

(function () {
	var header = document.querySelector('#header > nav > div > div.aui-header-primary > ul');
	var anchorFactory = function (label, clickCallback) {
		var anchor = document.createElement('a');
		anchor.href = '#';
		anchor.innerText = label;
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

	var copyIdAnchor = anchorFactory('🆔', handleClick.bind(null, getId));
	var copySummaryAnchor = anchorFactory('📜', handleClick.bind(null, getSummary));
	var copyBranchNameAnchor = anchorFactory('⑂', handleClick.bind(null, compose(replaceInvalidCharacters, getSummary)));

	addAnchor(copyIdAnchor);
	addAnchor(copySummaryAnchor);
	addAnchor(copyBranchNameAnchor);
})();
