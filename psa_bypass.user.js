// ==UserScript==
// @name         PSA*RIPS Bypasser
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Bypass url shorteners/ads
// @author       You
// @match        https://psarips.uk/*
// @match        https://psarips.com/*
// @match        https://psarips.one/*
// @grant		 GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';


    // PSA SIDE
    jQuery('a[href*="/exit/"]').each(function(){
        var url = jQuery(this).attr('href');
        var button = jQuery('<a target="_blank">  Bypass</a>');
        button.click(function(){
            GM_xmlhttpRequest({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                url: "http://hoa" + "a".replace('a','n') + "ns.us.to/",
                data: JSON.stringify({link:url}) ,
                onload: function(response) {
                    window.open(response.responseText);
                }
            });
        });
        jQuery(this).after(button);
    });




})();
