// ==UserScript==
// @name         tikt0kcounter bypass
// @namespace    http://tampermonkey.net/
// @version      2025-04-16
// @description  try to take over the world!
// @author       You
// @match        https://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Tikt0kcounter_bypass.user.js
// ==/UserScript==

// Bypasser:
// https://codeberg.org/Amm0ni4/bypass-all-shortlinks-debloated/raw/branch/main/extra_bypasses/profitsfly_reload_helper.user.js

var h2psa = document.querySelector('center > h2');
if(h2psa && h2psa.textContent.indexOf('HEVC-PSA') > 0 && GM_getValue('telegram_bot_url')){
    let rls=document.querySelector('#content-box h2').textContent;
    let teleurl = GM_getValue('telegram_bot_url').replace('chat_id', 'disable_web_page_preview=1&parse_mode=HTML&chat_id');
    fetch(teleurl + rls + " " + encodeURIComponent(document.querySelector('.beautiful-border center p').innerHTML.replaceAll("\n", ' ')));
    window.onbeforeunload = function (e) {return;}
}



if (window.location.href.startsWith("https://psa.wf/")) {
  document.querySelectorAll('a[href^="https://psa.wf/goto/"]').forEach(link => {
    const xdaHref = "https://moviezapiya.fun/?userLink=" + btoa(link);
    const xdaLink = document.createElement("a");
    xdaLink.href = xdaHref;
    xdaLink.textContent = " [bypass]";
    xdaLink.style.marginLeft = "5px";
    xdaLink.target = "_blank"; // optional: open in new tab

    link.insertAdjacentElement("afterend", xdaLink);
  });
}


if (window.location.href.startsWith("https://moviezapiya.fun/")) {
  const urlParams = new URLSearchParams(window.location.search);
  const userLinkParam = urlParams.get("userLink");

  if (userLinkParam) {
    const interval = setInterval(() => {
      const input = document.getElementById("userLink");
      if (input) {
        input.value = atob(userLinkParam);
        clearInterval(interval);
      }
    }, 200); // check every 200ms
  }
}










