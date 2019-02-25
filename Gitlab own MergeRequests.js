// ==UserScript==
// https://github.com/hannsen/userscripts
// @name         My Merge Requests Gitlab
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Show Link to opened Merge Requests, auto click swipe on MR with pics
// @author       hannsen
// @match        https://git04.quodata.de/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @downloadURL  https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.js
// @updateURL    https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
(function() {
    'use strict';

    //    var swipe = 0;
    //    function scrollFunction() {
    //        if(!swipe)
    //            swipe = $('li.swipe');
    //
    //        for(var i = 0; i < swipe.length; i++){
    //            if(isScrolledIntoView(swipe[i])){
    //                swipe[i].click();
    //                return;
    //            }
    //        }
    //    }
    //
    //    function isScrolledIntoView(elem) {
    //        var docViewTop = $(window).scrollTop();
    //        var docViewBottom = docViewTop + $(window).height();
    //        var elemTop = $(elem).offset().top;
    //        var elemBottom = elemTop + $(elem).height();
    //        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    //    }
    //
    //    if(window.location.href.indexOf("merge_requests") > 0)
    //        window.onscroll = scrollFunction;

    var last_mr_count = GM_getValue("open_mr_count") || 0;

    var $merge_button = $($(".user-counter:eq( 1 )").prop('outerHTML'));
    var new_href = $merge_button.children().attr('href').replace('assignee_username', 'scope=all&state=opened&author_username');
    $merge_button.children().attr('href', new_href);
    $merge_button.find('span').toggleClass('gitlab-own-merge-requests merge-requests-count issues-count')
        .removeClass('hidden');
    $merge_button.find('span').html(last_mr_count);
    $($merge_button.prop('outerHTML')).insertBefore(".user-counter:eq( 2 )");

    $.ajax({
            url: new_href,
        })
        .done(function(data) {
            var open_mr_count = $(data).find('a#state-opened > span.badge').html();
            $('.gitlab-own-merge-requests').html(open_mr_count);
            GM_setValue("open_mr_count", open_mr_count);
        });

})();
