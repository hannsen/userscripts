// ==UserScript==
// @name         PSA*RIPS Bypasser
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bypass url shorteners/ads
// @author       You
// @match        https://psarips.one/*
// @match        https://reqbin.com/curl*
// @grant		 GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    var $ = jQuery;

    // PSA SIDE
    $('a[href*="/exit/"]').each(function(){
        var url = $(this).attr('href');
        var button = $('<a target="_blank">  Bypass</a>');
        button.click(function(){
            GM_xmlhttpRequest({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                url: "http://X.X.X.X:5000/",
                data: JSON.stringify({link:url}) ,
                onload: function(response) {
                    window.open(response.responseText);
                }
            });
        });
        $(this).after(button);
    });




})();
