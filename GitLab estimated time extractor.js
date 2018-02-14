// ==UserScript==
// @name         GitLab estimated time extractor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extract time estimations from gitlab issues to the issue list
// @author       hannsen
// @match        *://git04.quodata.de/*/*/issues*
// @match        *://git04.quodata.de/dashboard/issues*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @downloadURL  https://raw.githubusercontent.com/hannsen/userscripts/master/GitLab%20estimated%20time%20extractor.js
// @updateURL    https://raw.githubusercontent.com/hannsen/userscripts/master/GitLab%20estimated%20time%20extractor.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var hrefs = [];
    var pattIssue = /.*\/issues\/\d*$/i;
    $('.issues-list').find('a').each(function(){
        if($(this).attr('href').match(pattIssue)){
            $.ajax({
                url: $(this).attr('href'),
            }).done(function( data ) {
                var $data_json = $(data).find('div[data-noteable-data]').attr('data-noteable-data');
                var $json = JSON.parse($data_json);
                var time_estimate =  $json.human_time_estimate;
                if (time_estimate != null){
                    $('#issue_' + $json.id).find('.issuable-info').append(
                        '<span class="label color-label" style="background-color: #222222">' + time_estimate + '</span>');
                }
            });
        }
    });
})();
