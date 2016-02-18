// ==UserScript==
// @name           The MyProject Next Generation User Script
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Provides a way of hiding the right panel of the split view
// @include        https://myproject.telekom.de/*
// @version        1
// @noframes
// @run-at         document-idle
// ==/UserScript==

(function () {
    var pollerId;
    var toolBarItems;
    var rightPanelHidden = false;

    var buttonFactory = function (label, clickCallback) {
        var button = document.createElement('button');
        button.innerText = label;
        button.className = 'button';
        button.addEventListener('click', clickCallback);
        return button;
    };

    var addButton = function (anchor) {
        var li = document.createElement('li');
        li.className = 'toolbar-item';
        li.appendChild(anchor);
        toolBarItems.appendChild(li);
    };

    var hideRightPanelButton = buttonFactory('💩', function (e) {
        e.preventDefault();
        var rightPanel = document.querySelector('#work-packages-index .work-packages--split-view .work-packages--right-panel');
        rightPanel.style.display = rightPanelHidden ? 'block' : 'none';
        var leftPanel = document.querySelector('#work-packages-index .work-packages--split-view .work-packages--left-panel');
        leftPanel.style.width = rightPanelHidden ? 'calc(60% + 0.375rem)' : '100%';
        rightPanelHidden = !rightPanelHidden;
    });

    var checkToolBarPresence = function () {
        var toolBar = document.querySelector('#toolbar');
        if (toolBar) {
            toolBarItems = document.querySelector('#toolbar-items');
            clearInterval(pollerId);
            addButton(hideRightPanelButton);
        }
    };
    pollerId = setInterval(checkToolBarPresence, 300);
})();
