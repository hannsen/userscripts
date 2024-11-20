// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2024-11-18
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==

// Bypasser:
// https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/Bypass_All_Shortlinks.user.js

var h2psa = document.querySelector('center > h2');
if(h2psa && h2psa.textContent.indexOf('HEVC-PSA') > 0 && GM_getValue('telegram_bot_url')){
    let rls=document.querySelector('#content-box h2').textContent;
    let teleurl = GM_getValue('telegram_bot_url').replace('chat_id', 'disable_web_page_preview=1&parse_mode=HTML&chat_id');
    fetch(teleurl + rls + " " + encodeURIComponent(document.querySelector('.beautiful-border center p').innerHTML.replaceAll("\n", ' ')));
    window.onbeforeunload = function (e) {return;}
}














