// ==UserScript==
// @name           The Gard customized reviewed tickets script
// @namespace      https://github.com/kyusu/mygreasemonkeyscripts
// @description    Adds a custom class to all tickets which need to be reviewed and which are have been implemented by the current user
// @include        https://gard.telekom.de/gard/secure/RapidBoard.jspa*
// @version        1
// @noframes
// @run-at         document-end
// ==/UserScript==
'use strict';
(function () {
    const getIssue = img => img.parentNode.parentNode;
    const addClass = (className, element) => element.classList.add(className);
    const getUserName = () => document.getElementById('header-details-user-fullname').getAttribute('data-displayname');
    const getSelector = userName => `li[data-column-id="5271"] img[alt="Assignee: ${userName}"]`;
    const getImages = selector => Array.from(document.querySelectorAll(selector));
    const getIssues = images => images.map(getIssue);
    const markIssues = issues => issues.forEach(addClass.bind(null, 'review-small'));
    const issuesPresent = () => !!document.querySelector('.ghx-issue');
    const intervalId = setInterval(() => {
        if (issuesPresent()) {
            clearInterval(intervalId);
            markIssues(getIssues(getImages(getSelector(getUserName()))));
        }
    }, 1000);
})();
