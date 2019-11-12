// ==UserScript==
// @name         MR Templates Gitlab
// @namespace    http://quodata.de/
// @version      1.3
// @description  Show merge request templates
// @author       hannsen
// @match        https://git04.quodata.de/it/delphi/merge_requests/new*
// @match        https://git04.quodata.de/it/oequasta/merge_requests/new*
// @match        https://git04.quodata.de/it/OEQUASTA-Kollektivbildung/merge_requests/new*
// @match        https://git04.quodata.de/it/oequasta-kollektivbildung/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_ptop_modules_project/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/hub/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_base_entity/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_screenshottests/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_datatables_form/merge_requests/new*
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Gitlab%20MR%20templates.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Gitlab%20MR%20templates.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
(function() {
    'use strict';

    var my_template = `### Suggested CHANGELOG entry

### QD-interne Beschreibung & Motivation

### Gleichzeitig zu mergende MRs:

### Automatische Tests
`;


    $.ajax({
        url: "https://git04.quodata.de/qd_drupal_projects/hub/templates/merge_request/default_template",
    }).done(function(data){
        var to_insert = GM_getValue('short_template') ? my_template : data.content;
        $('#merge_request_description').val(to_insert);

        // So the scrollbar shows
        var press = $.Event("keypress");
        press.ctrlKey = false;
        press.which = 32; //Space
        $("#merge_request_description").trigger(press);
    });


})();
