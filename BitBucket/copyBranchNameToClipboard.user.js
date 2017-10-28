// ==UserScript==
// @name           Copy branch name to clipboard
// @description    Copy the branch name of the current pull request to the clipboard so it can used on the command line
// @include        https://bitbucket.kkeu.de/projects/*/repos/*/pull-requests/*
// @grant          GM_setClipboard
// @run-at         document-idle
// ==/UserScript==

(function () {
    const branchNameEls = document.getElementsByClassName('branch-name');
    if (branchNameEls) {
        const branchNameEl = branchNameEls[0];
        if (branchNameEl) {
            branchNameEl.style.cursor = 'pointer';
            branchNameEl.style.color = '#3572b0';
            branchNameEl.addEventListener('click', ev => {
                const branchName = ev.target.innerText;
                GM_setClipboard(branchName);
            });
        }
    }
}());




