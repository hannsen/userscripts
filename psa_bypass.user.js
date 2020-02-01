// ==UserScript==
// @name         PSA*RIPS Bypasser
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Bypass url shorteners/ads
// @author       You
// @match        https://psarips.one/*
// @match        https://reqbin.com/curl*
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery;

    // PSA SIDE
    $('a[href*="/exit/"]').each(function(){
        var url = $(this).attr('href');
        var button = $('<a target="_blank">  Bypass</a>');
        button.attr('href', 'https://reqbin.com/curl?psa_url=' + encodeURIComponent(url));
        $(this).after(button);
    });


    // CURL SIDE
    var config = {attributes: true, childList: true, subtree: true};
    function waitForJquerySelector (selector, callback) {
        var waitForLoaded = new MutationObserver(function (mutations) {
            var elem = jQuery(selector);
            if (elem.length > 0) {
                waitForLoaded.disconnect();
                callback(elem[0]);
            }
        });
        waitForLoaded.observe(document.body, config)
    }

    var urlParams = new URLSearchParams(window.location.search);
    var psa_url = urlParams.get('psa_url');
    if(psa_url && window.location.href.indexOf("reqbin.com") > 0){
        waitForJquerySelector('.CodeMirror', function(editor_elem){
            var editor = editor_elem.CodeMirror;
            editor.setValue('curl --location --silent -D - -o - ' + psa_url);
            document.querySelector('#submit').click();
            waitForJquerySelector('#resRedirects:contains(302)', function(elem){
                var base64url = elem.value.match(/&url=(.*)/)[1];
                location.href = atob(base64url);
            });
        });

    }


})();
