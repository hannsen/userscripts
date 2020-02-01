// ==UserScript==
// @name         PSA*RIPS Bypasser
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bypass url shorteners/ads
// @author       You
// @match        https://psarips.one/*
// @match        https://reqbin.com/curl
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    var $ = jQuery;

    // PSA SIDE
    function init_bypass(){
        var url = $(this).prev().attr('href');
        GM_setValue('psa_url', url);
        window.open('https://reqbin.com/curl');
    }

    $('a[href*="/exit/"]').each(function(){
        var button = $('<a class="button"  href="javascript:void(0)">  Bypass</a>');
        button.click(init_bypass);
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

    var psa_url = GM_getValue('psa_url');
    if(psa_url && window.location.href.indexOf("reqbin.com") > 0){
        GM_setValue('psa_url', '');

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
