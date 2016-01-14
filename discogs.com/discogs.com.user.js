// ==UserScript==
// @name           New items helper
// @description    Marks the newest item from the previous session
// @include        http://www.discogs.com/sell/list?currency=EUR&style=Black+Metal&ships_from=Germany&genre=Rock&price=under5&controller=_mp_facets
// @match          http://www.discogs.com/sell/list?currency=EUR&style=Black+Metal&ships_from=Germany&genre=Rock&price=under5&controller=_mp_facets
// ==/UserScript==

(function () {
    var previousFirstLink = window.localStorage.getItem('firstLink');
    if (previousFirstLink) {
        var allItemAnchorsNodeList = document.querySelectorAll('#page_content table tbody tr .item_description a');
        var allItemAnchors = Array.prototype.slice.call(allItemAnchorsNodeList);
        var matchingAnchors = allItemAnchors.filter(function (anchor) {
            return anchor.href === previousFirstLink;
        });
        var matchingAnchor = matchingAnchors[0];
        if (matchingAnchor) {
            matchingAnchor.style.backgroundColor = 'red';
        }
    }
    var currentFirstLink = document.querySelector('#page_content table tbody tr:first-child .item_description a').href;
    window.localStorage.setItem('firstLink', currentFirstLink);

}());
