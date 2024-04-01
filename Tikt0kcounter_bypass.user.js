// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-04-01
// @description  try to take over the world!
// @author       You
// @match        https://tiktokcounter.net/*
// @grant        none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==


function fastclick(){
        isHoverDone = true; isTimerCompleted = true; isAdClickDone = true; isFirstClickDone = true;
    formulaSend(new MouseEvent('click', { 'bubbles': true }));
}
window.setTimeout(fastclick, 23000);


