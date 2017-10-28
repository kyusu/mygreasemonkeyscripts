// ==UserScript==
// @name         Commit links
// @description  Adds links to the commit to the commit tab in the BitBucket pull request view
// @match        https://bitbucket.kkeu.de/projects/HYB/repos/*/pull-requests/*/commits
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function () {
    Array.from(document.querySelectorAll('tbody .commit-row')).forEach(row => {
        const commit = row.querySelector('.commit');
        const clonedCommit = commit.cloneNode(true);
        const anchor = clonedCommit.querySelector('.commitid');
        anchor.setAttribute('data-commit-message', null);
        anchor.innerText = '⬈';
        anchor.className = null;
        anchor.setAttribute('href', anchor.getAttribute('href').replace(/\/pull-requests\/\d+/, ''));
        row.insertBefore(clonedCommit, row.querySelector('.message'));
    });
    const thead = document.querySelector('.commits-table thead tr');
    const clonedCommitHeader = thead.querySelector('.commit').cloneNode(true);
    clonedCommitHeader.innerText = '⬈';
    const messageHeader = thead.querySelector('.message');
    thead.insertBefore(clonedCommitHeader, messageHeader);
})();