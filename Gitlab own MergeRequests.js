// ==UserScript==
// @name         My Merge Requests gitlab
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  My Merge Requests link in gitlab
// @author       You
// @match        https://git04.quodata.de/*
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    $(
        `<li class="user-counter"><a title="Merge requests" class="dashboard-shortcuts-merge_requests" aria-label="Merge requests" data-toggle="tooltip"
          data-placement="bottom" data-container="body" href="/dashboard/merge_requests?state=opened&author_id=77"><svg class="s16">
          <use xlink:href="/assets/icons-f1e1e3187fbe3fe3aa42a17cb2558778f1a2ddc2a1914f0ea7ea59d27b4e425c.svg#git-merge"></use></svg>
          <span class="badge merge-requests-count"> M </span> </a></li>` ).insertBefore( ".user-counter:eq( 2 )" );

    
})();
