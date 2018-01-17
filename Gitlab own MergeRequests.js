// ==UserScript==
// @name         My Merge Requests gitlab
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  My Merge Requests link in gitlab
// @author       You
// @match        https://git04.quodata.de/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var $merge_button = $($(".user-counter:eq( 1 )").prop('outerHTML'));
    var new_href = $merge_button.children().attr('href').replace('assignee_id','state=opened&author_id');
    $merge_button.children().attr('href',new_href);
    $merge_button.find('span').html('M').toggleClass('hidden gitlab-own-merge-requests');

    $($merge_button.prop('outerHTML')).insertBefore( ".user-counter:eq( 2 )" );

    $.ajax({
        url: new_href,
    })
        .done(function( data ) {
        var open_mr = $(data).find('a#state-opened > span.badge').html();
        $('.gitlab-own-merge-requests').html('M' + open_mr );
    });

})();
