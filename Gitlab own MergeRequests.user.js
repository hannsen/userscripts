// ==UserScript==
// https://github.com/hannsen/userscripts
// @name         My Merge Requests Gitlab
// @namespace    http://tampermonkey.net/
// @version      2.8
// @description  Show Link to opened Merge Requests, auto click swipe on MR with pics
// @author       hannsen
// @match        https://git04.quodata.de/*
// @downloadURL  https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.user.js
// @updateURL    https://raw.githubusercontent.com/hannsen/userscripts/master/Gitlab%20own%20MergeRequests.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==
(function() {
    'use strict';

    // Old function to try to select a certain picture comparing method in merge requests
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
    //
    //

    var git_url_prefix = GM_getValue("git_url_prefix");
    var $http_clone = $('input[name="http_project_clone"]');


    // Add gui for setting prefix
    if($http_clone.length){
        var titletext = "Prefix to add to the clone url across all projects";
        var butt = $('<input type="button" value="Set prefix" title="' + titletext +'" />');
        var input = $('<input id="clone_url_token" placeholder="username:token" title="' + titletext + '" />');
        var line = $http_clone.closest('li.pt-2');
        line.append('<br>', input, butt);

        butt.click(function(){
            var val = $('input#clone_url_token').val();
            if(val)
                GM_setValue("git_url_prefix", val);
        });
    }


    // Adding prefix to clone url
    if(git_url_prefix && $http_clone.val()){
        var clone_url = $http_clone.val();
        clone_url = clone_url.replace("https://", "https://" + git_url_prefix + "@");
        $http_clone.val(clone_url);
    }


    // Coloring collapsed diffs
    function colorCollapsed(){
        $("div.diff-collapsed, div.nothing-here-block").css('background-color', 'red');
    }
    if(window.location.href.indexOf("merge_requests") > 0){
        window.onscroll = colorCollapsed;
    }


    // Adding own merge request button
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


    // Grey out issues with pending Merge Request
    if(document.location.href.indexOf('dashboard/issues?') !== -1 && document.location.href.indexOf('assignee_username=') !== -1){
        $('li.issue:has(.issuable-mr)').css('opacity', 0.4);
    }

})();
