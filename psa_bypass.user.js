// ==UserScript==
// @name         PSA*RIPS Bypasser
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Bypass url shorteners/ads
// @author       You
// @match        https://psarips.one/*
// @match        https://psarips.xyz/*
// @match        https://helloacm.com/curl/*
// ==/UserScript==

(function() {
    'use strict';

    // PSA SIDE
    var dl_links = document.querySelectorAll('a[href*="/exit/"]');
    dl_links.forEach(function(item){
        var button = document.createElement('a');
        button.innerHTML = "  Bypass";
        button.target = "_blank";
        button.href ='https://helloacm.com/curl/?url=' + encodeURIComponent(item.href);
        item.parentNode.insertBefore(button, item.nextSibling);
    });

    // CURL SIDE
    var config = {attributes: true, childList: true, subtree: true};
    function waitForSelector (selector, callback) {
        var waitForLoaded = new MutationObserver(function (mutations) {
            var elem = document.querySelector(selector);
            if (elem) {
                waitForLoaded.disconnect();
                callback(elem);
            }
        });
        waitForLoaded.observe(document.body, config)
    }

    if(window.location.href.indexOf("helloacm.com") > 0){
        var elem = document.querySelector('fieldset pre');
        waitForSelector('fieldset pre', function(elem){
            var base64url = elem.innerText.match(/&url=(.*)/)[1];
            location.href = atob(base64url);
        });
    }

})();
