// ==UserScript==
// @name         YetAnotherAdBypasser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Will hopefully automatically navigate url shorteners and other ads
// @author       You
// @include        http://*
// @include        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var config = {attributes: false, childList: true, subtree: false};
    var waitForLoaded = new MutationObserver(function (mutations) {
        var overlay = document.querySelector('#s65c');
        if(overlay) overlay.style.zIndex = -1;
    });
    waitForLoaded.observe(document.body, config)

})();
