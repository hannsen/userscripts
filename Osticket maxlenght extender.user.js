// ==UserScript==
// @name         Osticket maxlenght extender
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://support.quodata.de/scp/tickets.php?id=*&a=edit
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quodata.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

document.querySelector('input[maxlength="50"]').maxLength = 500;
})();
