// ==UserScript==
// @name         YetAnotherAdBypasser
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Will hopefully automatically navigate url shorteners and other ads
// @author       You
// @include        http://*
// @include        https://*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var min_config = {attributes: false, childList: true, subtree: false};
    var big_config = {attributes: true, childList: true, subtree: true};
    var waitForLoaded = new MutationObserver(function (mutations) {
        var overlay = document.querySelector('#s65c');
        if(overlay) setTimeout(function(){overlay.style.zIndex = -1;}, 250);

        overlay = document.querySelector('#qc-cmp2-container');
        if(overlay){
            setTimeout(function(){
                overlay = document.querySelector('.qc-cmp-cleanslate');
                if(overlay) overlay.style.zIndex = -1;
            }, 250);
        }
    });
    waitForLoaded.observe(document.body, min_config)


    function clickSubmitBtn(submitBtn) {
        setTimeout(function(){clickSubmitBtn(submitBtn)}, 2500);
        if(!submitBtn || submitBtn.classList.contains('disabled') || submitBtn.disabled) return;
        submitBtn.click();
    }

    let selectors = ['#submitbtn', '#go_d.submitBtn', ".btn-primary", "form#submit_data > .btn-primary"];
    selectors.forEach((selector) => {
        let submitBtn = document.querySelector(selector);
        clickSubmitBtn(submitBtn);
    });

    let countdown_selectors = {
        '#countdown.countdown': ".btn-success",
        '#countdown > #yu-time': ".btn-primary",
    };
    for (const [cd_sel, btn_sel] of Object.entries(countdown_selectors)) {
        let countdown = document.querySelector(cd_sel);
        if(!countdown) return;

        let countdownWait = new MutationObserver(function (mutations) {
            let submitBtn = document.querySelector(btn_sel);
            clickSubmitBtn(submitBtn);
        });
        countdownWait.observe(countdown, big_config)
    }


})();
