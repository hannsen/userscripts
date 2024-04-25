// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-04-27
// @description  try to take over the world!
// @author       You
// @match        https://tiktokcounter.net/*
// @match        https://tpayr.xyz/*
// @match        https://lifgam.online/*
// @match        https://waezf.xyz/*
// @grant        none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==


function fastclick(){
        isHoverDone = true; isTimerCompleted = true; isAdClickDone = true; isFirstClickDone = true; isClownClickDone = true;
    formulaSend(new MouseEvent('click', { 'bubbles': true }));
}
window.setTimeout(fastclick, 5000);


function findVarname(){
    var scripts = document.querySelectorAll('script');
    for(var i = 0; i < scripts.length; i++){
        var match = scripts[i].innerHTML.match(/\(isTimerCompleted\s&&\s(.+)\)/);
        if(match){
            window[match[1]] = true;
        }
    }

}

window.setTimeout(findVarname, 2000);
