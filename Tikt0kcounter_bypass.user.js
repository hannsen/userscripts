// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-05-17
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==



if(document.getElementById('poweredByProfitsFly') || document.querySelector('[onclick$="formulaSend(event)"]')){


    function fastclick(){
        isHoverDone = true; isTimerCompleted = true; isAdClickDone = true; isFirstClickDone = true; isClownClickDone = true;
        formulaSend(new MouseEvent('click', { 'bubbles': true }));
    }

    function findVarname(){
        var scripts = document.querySelectorAll('script');
        for(var i = 0; i < scripts.length; i++){
            var match = scripts[i].innerHTML.match(/\(isTimerCompleted\s&&\s(.+)\)/);
            if(match){
                window[match[1]] = true;
            }
        }
    }



    window.setTimeout(findVarname, 8000);
    window.setTimeout(fastclick, 10000);
}

function findFlyIncInpiut(){
    var ttc_flyIncInput = document.querySelector('div.card-container > div.card > form[action][style="display: none;"]');
    if(ttc_flyIncInput) ttc_flyIncInput.style.display = 'block';
}
window.setTimeout(findFlyIncInpiut, 8000);





