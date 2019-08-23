// ==UserScript==
// @name         Gitlab Changelog Getter
// @namespace    http://git04.quodata.de
// @version      0.1
// @description  Gitlab Changelog Getter
// @author       hoanns
// @match        https://git04.quodata.de/*/merge_requests
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Gitlab%20changelog%20getter.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Gitlab%20changelog%20getter.user.js
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    var $ = jQuery;

    var project = window.location.href.match(/quodata.de\/(.+?)\/merge/)[1];
    var ids = {
        "qd_drupal_projects/hub" : "154",
        "qd_drupal_projects/qd_ptop_modules_project": "155",
        "it/oequasta-kollektivbildung": "96",
        "it/oequasta": "85",
    };
    var project_id = ids[project];

    var $butt = $('<button class="btn">Get Changelog</button>');
    function addGUI(){
        $('div.nav-controls').prepend($butt);
        $('div.nav-controls').prepend('<input type="date" name="changelog" style="width:140px">');
    }
    if(project_id){
        addGUI();
    }


    $butt.click(function() {
        var datum = $('input[name="changelog"]').val();
        if (!datum) {
            alert('Choose date');
            return;
        }

        $.getJSON(
            'https://git04.quodata.de/api/v4/projects/'+ project_id +'/merge_requests?state=merged&updated_after=' + datum + '&per_page=100',
            function(data) {
                var changelog = filterChangelog(data, datum);
                $('html').html('<pre>' + changelog + '</pre>');
            });

    });

    function filterChangelog(data, datum){
        var changelog = '';
        $(data).each(function(){
            if(!this.merged_at >= datum){
                return;
            }
            var desc = this.description;
            // [\s\S] = dotall modifier hack
            var match = desc.match(/CHANGELOG entry([\s\S]+?)###/);
            if(match && match.length >= 2){
                var hit = match[1];
                hit = hit.replace('<!-- Falls es Kunden etwas angeht; in Kundensprache. -->', '');

                changelog += hit;
            }
        });
        return changelog;
    }

})();
