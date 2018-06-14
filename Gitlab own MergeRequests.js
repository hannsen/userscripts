// ==UserScript==
// @name         My Merge Requests Gitlab
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Show Link to opened Merge Requests, auto click swipe on MR with pics
// @author       hannsen
// @match        https://git04.quodata.de/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @downloadURL  https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.js
// @updateURL    https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.js
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    var swipe = 0;
    function scrollFunction() {
        if(!swipe)
            swipe = $('li.swipe');

        for(var i = 0; i < swipe.length; i++){
            if(isScrolledIntoView(swipe[i])){
                swipe[i].click();
                return;
            }
        }
    }

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    if(window.location.href.indexOf("merge_requests") > 0)
        window.onscroll = scrollFunction;


    var $merge_button = $($(".user-counter:eq( 1 )").prop('outerHTML'));
    var new_href = $merge_button.children().attr('href').replace('assignee_id','state=opened&author_id');
    $merge_button.children().attr('href',new_href);
    $merge_button.find('span').toggleClass('gitlab-own-merge-requests merge-requests-count issues-count')
        .removeClass('hidden');
    $($merge_button.prop('outerHTML')).insertBefore( ".user-counter:eq( 2 )" );

    $.ajax({
        url: new_href,
    })
        .done(function( data ) {
        var open_mr = $(data).find('a#state-opened > span.badge').html();
        $('.gitlab-own-merge-requests').html( open_mr );
    });

})();
