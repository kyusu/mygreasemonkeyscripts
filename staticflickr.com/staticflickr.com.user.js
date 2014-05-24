// ==UserScript==
// @name           The flickr account finder
// @description    Finds the account from which a static flickr image is coming
// @include        *://*.staticflickr.com/*
// @match          *://*.staticflickr.com/*
// ==/UserScript==

(function () {
    var photoId =  window.location.pathname.split('/').pop().split('_').shift();
    var anchor = document.createElement('a');
    anchor.href= 'http://flickr.com/photo.gne?id=' + photoId;
    anchor.style.position = 'absolute';
    anchor.style.top = '0px';
    anchor.style.left = '0px';
    anchor.style.color = 'e20074';
    anchor.style.background = 'ffffff';
    anchor.innerText = 'Flickr Account';
    document.getElementsByTagName('body')[0].appendChild(anchor);
}())

