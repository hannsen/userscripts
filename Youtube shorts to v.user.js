// ==UserScript==
// @name         Youtube shorts to v
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirect to video view of shorts
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkAndRedir(){
        if(window.location.href.startsWith("https://www.youtube.com/shorts/")){
            window.location.href = window.location.href.replace('shorts', 'v')
        }
    }
    checkAndRedir();


    var config = {attributes: false, childList: true, subtree: false};
    var waitForLoaded = new MutationObserver(function (mutations) {
        checkAndRedir();
    });
    waitForLoaded.observe(document.body, config)

})();
