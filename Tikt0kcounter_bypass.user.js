// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-09-17
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        GM_getValue
// @grant        GM_setValue
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



if(window.location.href.indexOf('https://get' + '-' + 'to' + '.' +'link/') >= 0 && GM_getValue('telegram_bot_url')){
    let rls=document.querySelector('#content-box h2').textContent;
    let megaurl=document.querySelector('a[href*="mega.nz"]').href;
    fetch(GM_getValue('telegram_bot_url') + rls + " " + megaurl.replace('#','%23') + '&disable_web_page_preview=1');
    window.onbeforeunload = function (e) {return;}
}














