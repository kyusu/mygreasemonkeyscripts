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
    var editableDescriptionHidden = false;
    var domId = 'user-script-non-editable-description';
    var magenta = '#e20074';
    var originalColor = 'rgb(248, 248, 248)';

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

    var addNonEditableDescriptionButton = buttonFactory('X', function (e) {
        e.preventDefault();
        e.target.style.backgroundColor = editableDescriptionHidden ? originalColor : magenta;
        if (editableDescriptionHidden) {
            hideNonEditableDescription();
        } else {
            showNonEditableDescription();
        }
        editableDescriptionHidden = !editableDescriptionHidden;
    });

    var hideRightPanelButton = buttonFactory('->', function (e) {
        e.preventDefault();
        e.target.style.backgroundColor = rightPanelHidden ? originalColor : magenta;
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
            addButton(addNonEditableDescriptionButton);
        }
    };
    pollerId = setInterval(checkToolBarPresence, 300);
})();
