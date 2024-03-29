// ==UserScript==
// @name         GitLab Changelog Getter
// @namespace    http://git04.quodata.de
// @version      0.5
// @description  GitLab Changelog Getter
// @author       hoanns
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @match        https://git04.quodata.de/*/merge_requests*
// @downloadURL  https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab%20changelog%20getter.user.js
// @updateURL    https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab%20changelog%20getter.user.js
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    var $ = jQuery;

    var project = window.location.href.match(/quodata.de\/(.+?)\/-\/merge_requests/)[1];
    var ids = {
        "qd_drupal_projects/hub": "154",
        "qd_drupal_projects/qd_ptop_modules_project": "155",
        "it/oequasta-kollektivbildung": "96",
        "it/oequasta": "85",
        "it/delphi": "196",
    };
    var project_id = ids[project];


    var $butt = $('<button class="btn">Get Changelog</button>');

    function addGUI() {
        $('div.nav-controls').prepend($butt);
        $('div.nav-controls').prepend('<input type="date" name="changelog" style="width:140px">');
    }

    if (project_id) {
        addGUI();
    }


    var datum = '';
    $butt.click(function () {
        datum = $('input[name="changelog"]').val();
        if (!datum) {
            alert('Choose date');
            return;
        }
        getJsonData();
    });


    var all_changes = '';
    var page = 1;

    function getJsonData(){
        $.getJSON(
            'https://git04.quodata.de/api/v4/projects/' + project_id + '/merge_requests?state=merged&updated_after=' + datum + '&per_page=100&page=' + page,
            function (data) {
                if(!data.length){
                    showChangelog(all_changes);
                    return;
                }
                page++;
                var changelog = filterChangelog(data, datum);
                all_changes += changelog;
                getJsonData();
            });
    }

    function showChangelog(changelog){
        $('html').html('<pre>' + changelog + '</pre>');
    }

    function filterChangelog(data, datum) {
        var changelog = '';
        $(data).each(function () {
            if (this.merged_at <= datum) {
                return;
            }
            var desc = this.description;
            // [\s\S] = dotall modifier hack
            var match = desc.match(/CHANGELOG entry([\s\S]+?)###/);
            if (match && match.length >= 2) {
                var hit = match[1];
                hit = hit.replace(/<!--[\s\S]*-->/, '');
                if (!hit.trim()) {
                    return;
                }

                hit = hit.replace(/\r?\n\r?\n/g, '\n');
                hit = hit.replace(/\r?\n\r?\n/g, '\n');
                var milestone = this.milestone ? this.milestone.title : '';
                var link = '<a href="' + this.web_url + '">Merge Request</a>';

                changelog += hit + ' (' + milestone + ')\n' + link + '\n';
            }
        });
        return changelog;
    }

})();

