// ==UserScript==
// @name           The "Delete Branch" enabler
// @description    Enables the "Delete Branch" checkbox on the BitBucket pull request dialog for you
// @include        https://bitbucket.kkeu.de/projects/*/repos/*/pull-requests/*
// @run-at         document-start
// ==/UserScript==

(function () {
    document.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('merge-button')) {
            const deleteBranchCheckbox = document.getElementById('delete-branch-checkbox');
            if (deleteBranchCheckbox) {
                deleteBranchCheckbox.checked = true;
            }
        }
    });
}());