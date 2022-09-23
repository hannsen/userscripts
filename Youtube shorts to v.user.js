// ==UserScript==
// @name         Youtube shorts to v
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Redirect to video view of shorts
// @author       You
// @match        https://www.youtube.com/shorts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

   window.location.href =   window.location.href.replace('shorts', 'v')
})();
