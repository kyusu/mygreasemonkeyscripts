// ==UserScript==
// @name           The MyProject Next Generation User Script
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Provides a way of hiding the right panel of the split view
// @include        https://myproject.telekom.de/*
// @version        1
// @noframes
// @grant          GM_getValue
// @grant          GM_setValue
// @run-at         document-idle
// ==/UserScript==

(function () {
    var pollForToolBarId;
    var keepAlivePollId;
    var toolBarItems;
    var domId = 'user-script-non-editable-description';
    var keepAliveInterval = 300000;
    var nonEditableKey = 'non_editable';
    var rightPanelKey = 'right_panel';

    var checkBoxFactory = function (state, changeCallBack) {
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = state;
        checkBox.addEventListener('change', changeCallBack);
        return checkBox;
    };

    var addCheckBox = function (checkBox) {
        var li = document.createElement('li');
        li.className = 'toolbar-item';
        li.appendChild(checkBox);
        toolBarItems.appendChild(li);
    };

    var showNonEditableDescription = function () {
        var workPackageDescription = document.querySelector('#work-package-description');
        var description = workPackageDescription.querySelector('.inplace-editing--container').innerHTML;
        var div = document.createElement('div');
        div.id = domId;
        div.innerHTML = description;
        workPackageDescription.appendChild(div);
        var editableDescription = workPackageDescription.querySelector('.inplace-edit.attribute-description');
        editableDescription.style.display = 'none';
    };

    var hideNonEditableDescription = function () {
        var workPackageDescription = document.querySelector('#work-package-description');
        var editableDescription = workPackageDescription.querySelector('.inplace-edit.attribute-description');
        editableDescription.style.display = 'block';
        var nonEditableDescription = document.querySelector('#' + domId);
        workPackageDescription.removeChild(nonEditableDescription)
    };

    var addNonEditableDescriptionButton = checkBoxFactory(GM_getValue(nonEditableKey), function (e) {
        GM_setValue(nonEditableKey, e.target.checked);
        if (e.target.checked) {
            showNonEditableDescription();
        } else {
            hideNonEditableDescription();
        }
    });

    var toggleRightPanel = function (hide) {
        var rightPanel = document.querySelector('#work-packages-index .work-packages--split-view .work-packages--right-panel');
        rightPanel.style.display = hide ? 'none' : 'block';
        var leftPanel = document.querySelector('#work-packages-index .work-packages--split-view .work-packages--left-panel');
        leftPanel.style.width = hide ? '100%' : 'calc(60% + 0.375rem)';
    };

    var hideRightPanelButton = checkBoxFactory(GM_getValue(rightPanelKey), function (e) {
        GM_setValue(rightPanelKey, e.target.checked);
        toggleRightPanel(e.target.checked);
    });

    var checkToolBarPresence = function () {
        var toolBar = document.querySelector('#toolbar');
        if (toolBar) {
            toolBarItems = document.querySelector('#toolbar-items');
            clearInterval(pollForToolBarId);
            addCheckBox(hideRightPanelButton);
            addCheckBox(addNonEditableDescriptionButton);
            if (GM_getValue(nonEditableKey)) {
                showNonEditableDescription();
            }
            var hideRightPanel = GM_getValue(rightPanelKey);
            if (hideRightPanel) {
                toggleRightPanel(hideRightPanel);
            }
        }
    };
    pollForToolBarId = setInterval(checkToolBarPresence, 300);

    var startKeepAlive = function () {
        var xhReq = new XMLHttpRequest();
        keepAlivePollId = setInterval(function () {
            xhReq.open('GET', 'https://myproject.telekom.de/pi/', true);
            xhReq.send(null);
        }, keepAliveInterval);
    };

    var handleKeepAliveChange = function (e) {
        if (e.target.checked) {
            GM_setValue('keep_alive', true);
            startKeepAlive();
        } else {
            GM_setValue('keep_alive', false);
            clearInterval(keepAlivePollId);
        }
    };

    var addKeepAliveCheckBox = function () {
        var keepAliveOn = !!GM_getValue('keep_alive');
        var accountNavLeft = document.querySelector('#account-nav-left');
        var li = document.createElement('li');
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.checked = keepAliveOn;
        input.addEventListener('click', handleKeepAliveChange);
        li.appendChild(input);
        accountNavLeft.appendChild(li);
        if (keepAliveOn) {
            startKeepAlive();
        }
    };

    addKeepAliveCheckBox();
})();
