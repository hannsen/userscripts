// ==UserScript==
// @name         MR Templates Gitlab
// @namespace    http://quodata.de/
// @version      1.1
// @description  Show merge request templates
// @author       hannsen
// @match        https://git04.quodata.de/it/delphi/merge_requests/new*
// @match        https://git04.quodata.de/it/oequasta/merge_requests/new*
// @match        https://git04.quodata.de/it/OEQUASTA-Kollektivbildung/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_ptop_modules_project/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/hub/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_base_entity/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_screenshottests/merge_requests/new*
// @match        https://git04.quodata.de/qd_drupal_projects/qd_datatables_form/merge_requests/new*
// ==/UserScript==
(function() {
    'use strict';

    $.ajax({
        url: "https://git04.quodata.de/qd_drupal_projects/hub/templates/merge_request/default_template",
    }).done(function(data){
        $('#merge_request_description').val(data.content);

        // So the scrollbar shows
        var press = $.Event("keypress");
        press.ctrlKey = false;
        press.which = 32; //Space
        $("#merge_request_description").trigger(press);
    });


})();
