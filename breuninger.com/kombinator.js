// ==UserScript==
// @name         Kombinator-Link
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a link to the kombinator to the Breuninger-B
// @author       急須
// @match        https://www.breuninger.com/de/marken/*/*/*/p/?variant=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const variant = new URLSearchParams(window.location.search).get('variant');
    if (variant) {
        const kombinatorUrl = `https://www.breuninger.com/de/entd/kombinationen/productstylings?farbid=${variant}`;
        const breuningerLogo = document.querySelector('.suchen-header__logo > a');
        if (breuningerLogo) {
            breuningerLogo.setAttribute('href', kombinatorUrl);
            breuningerLogo.setAttribute('target', "_blank");
        }
    }
})();
