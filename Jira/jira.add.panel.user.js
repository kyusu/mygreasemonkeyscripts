// ==UserScript==
// @name           The Jira "Add non-technical description" button
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Adds a panel to the description field of a JIRA ticket in which a non-technical description can be entered
// @include        https://*.atlassian.net/browse/MRD-*
// @version        1
// @noframes
// @run-at         document-end
// ==/UserScript==


(function () {
    var id;
    var counter;

    var header = document.querySelector('#header > nav > div > div.aui-header-primary > ul');
    var anchorFactory = function (label, title, clickCallback) {
        var anchor = document.createElement('a');
        anchor.href = '#';
        anchor.title = title;
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

    var checkPresenceOfTextArea = function (resolve, reject) {
        counter = counter + 1;
        var textArea = document.querySelector('#description');
        if (textArea) {
            clearInterval(id);
            resolve(textArea);
        } else if (counter > 100) {
           reject('Text area is not present');
        }
    };

    var getDescriptionTextArea = function () {
        return new Promise(function (resolve, reject) {
            counter = 0;
            id = setInterval(checkPresenceOfTextArea.bind(null, resolve, reject), 10);
        });
    };

    var addPanel = function (event) {
        event.preventDefault();
        var descriptionValueEl = document.querySelector('#description-val');
        var evt = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
        });
        descriptionValueEl.dispatchEvent(evt);
        getDescriptionTextArea().then(function (textArea) {
            var previousText = textArea.value;
            var panel = `{panel:bgColor=#ffe200}
{panel}`;
            textArea.value = `${previousText}\r\n${panel}`;
        });
    };

    var addPanelAnchor = anchorFactory('📒', 'Add panel for the "Non-technical description" of the ticket', addPanel);

    addAnchor(addPanelAnchor);
}());
