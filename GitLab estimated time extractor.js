// ==UserScript==
// https://github.com/hannsen/userscripts
// @name         GitLab estimated time extractor
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Extract time estimations from gitlab issues to the issue list, also copyable to excel
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
    var header = ["Name","Assigned","Description","Time estimate","Milestone",
                  "Milestone start","Milestone due"];
    var toExportes = header.join("\t") + "\n";
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

                var toExport = "";
                // title
                toExport += $json.title  + "\t";
                // assignee
                var assignee_name = $json.assignees[0] ? $json.assignees[0].name : "";
                toExport += assignee_name + "\t";
                //description
                //toExport += $json.description + "\t";
                toExport += "TODO" + "\t";
                //time estimate
                toExport += (time_estimate || "") + "\t";
                // milestone name
                var milestone = $json.milestone ? $json.milestone.title : "";
                toExport += milestone + "\t";
                //milestone start
                toExport += ($json.milestone ? $json.milestone.start_date || "" : "" ) + "\t";
                //milestone due
                toExport += ($json.milestone ? $json.milestone.due_date || "" : "" ) + "\t";

                if (time_estimate != null){
                    $('#issue_' + $json.id).find('.issuable-info').append(
                        '<span class="label color-label" style="background-color: #222222">' + time_estimate + '</span>');
                }
                toExport += "\n";
                toExportes += toExport;
            });
        }
    });

    var $swipeButton = $('.btn.btn-default.has-tooltip').clone();
    $swipeButton.removeAttr('href').click( function(){
        copyToClipboard(toExportes); alert('Copied to clipboard, paste to excel'); });
    $swipeButton.text('Copy issue info');
    $swipeButton.insertAfter('.btn.btn-default.has-tooltip');

    var copyToClipboard = str => {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };


})();

