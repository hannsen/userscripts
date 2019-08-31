// ==UserScript==
// @name         spotify ad-bypasser
// @namespace    https://spotify.com/
// @version      0.1
// @description  prevents crashing of the page if you use adblocker with spotify web
// @author       You
// @match        https://open.spotify.com/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var config = { attributes: true, childList: true, subtree: true };
    var title_tag;

    var last_title = GM_getValue("last_title");
    console.log('last_title ' + last_title);

    function startObserve(){
        var observer = new MutationObserver(onTitleChange);
        observer.observe(title_tag, config);
    }

    function onTitleChange(){
        var title = title_tag.textContent;
        console.log('changed ' + title);

        if(title == 'Advertisement'){
            location.reload(true);
        }
        else{
            GM_setValue("last_title", title);
        }
    };

    var waitForLoaded = new MutationObserver(function(mutations) {
        title_tag = document.querySelector('.track-info__name');
        if(title_tag){
            GM_setValue("last_title", title_tag.textContent);
            startObserve();
            waitForLoaded.disconnect()
        }
    })

    waitForLoaded.observe(document.body , config)
})();
