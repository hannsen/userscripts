// ==UserScript==
// @name         MR Templates GitLab
// @namespace    http://quodata.de/
// @version      2.0
// @description  Show merge request templates
// @author       hannsen
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @match        https://git04.quodata.de/*/*/-/merge_requests/new*
// @downloadURL  https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab%20MR%20templates.user.js
// @updateURL    https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab%20MR%20templates.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
(function() {
    'use strict';




    function startRequest(){
        jQuery.ajax({
        url: "https://git04.quodata.de/qd_drupal_projects/hub/templates/merge_request/default_template",
    }).done(function(data){
        var to_insert = data.content;
        if(GM_getValue('short_template')){
            to_insert = filterToShortTemplate(to_insert);
        }
        jQuery('#merge_request_description').val(to_insert);

        // So the scrollbar shows
        var press = jQuery.Event("keypress");
        press.ctrlKey = false;
        press.which = 32; //Space
        jQuery("#merge_request_description").trigger(press);
    });
    }

    setTimeout(startRequest, 100);

    function filterToShortTemplate(input){
        var lines = input.split('\n');
        var filtered = lines.filter(function (line) {
            return !line ||
                line.indexOf('#') == 0 || // Ueberschriften
                line.indexOf('* [ ]') == 0 ; // Checkboxen
        });
        return filtered.join('\n');
    }


})();

