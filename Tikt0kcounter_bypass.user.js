// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-10-17
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



    window.setTimeout(findVarname, 18000);
    window.setTimeout(fastclick, 18500);
}

function findFlyIncInpiut(){
    var ttc_flyIncInput = document.querySelector('div.card-container > div.card > form[action][style="display: none;"]');
    if(ttc_flyIncInput) ttc_flyIncInput.style.display = 'block';
}
window.setTimeout(findFlyIncInpiut, 8000);


var h2psa = document.querySelector('center > h2');
if(h2psa && h2psa.textContent.indexOf('HEVC-PSA') > 0 && GM_getValue('telegram_bot_url')){
    let rls=document.querySelector('#content-box h2').textContent;
    let megaurl=document.querySelector('a[href*="mega.nz"]').href;
    let teleurl = GM_getValue('telegram_bot_url').replace('chat_id', 'disable_web_page_preview=1&parse_mode=HTML&chat_id');
    fetch(teleurl + rls + " " + encodeURIComponent(document.querySelector('.beautiful-border center p').innerHTML.replace("\n", ' ')));
    window.onbeforeunload = function (e) {return;}
}














