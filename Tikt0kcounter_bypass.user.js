// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-04-25
// @description  try to take over the world!
// @author       You
// @match        https://tiktokcounter.net/*
// @match        https://tpayr.xyz/*
// @match        https://lifgam.online/*
// @grant        none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==


function fastclick(){
        isHoverDone = true; isTimerCompleted = true; isAdClickDone = true; isFirstClickDone = true; isClownClickDone = true;
    formulaSend(new MouseEvent('click', { 'bubbles': true }));
}
window.setTimeout(fastclick, 5000);


