// ==UserScript==
// @name         Actitime click to track
// @namespace    https://ktr.quodata.de/
// @version      0.1
// @description  Actitime click next to task to track
// @author       You
// @match        https://ktr.quodata.de/actitime/*
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/actitime_click_to_track.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/actitime_click_to_track.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    var update_timeout;
    var last_input;

    function trackTask(){
        var butt = jQuery(this);
        var stop_ours = butt.val() == 'Stop';
        stopTaskTrack(jQuery('input.tracker[value="Stop"]'));
        if(stop_ours){
            return;
        }

        startTaskTrackbutt(butt);
    }

    function stopTaskTrack(butt){
        clearTimeout(update_timeout);
        if(!butt[0]){
            return;
        }

        butt.val('Track');
        butt.closest('tr.actualRow').css('border', 'none');
        updateTime();
        clearTimeout(update_timeout);
    }


    function updateTime(){
        var last_filled = last_input.data('last_filled').split(':');
        var diff = Math.round((Date.now() - last_input.data('track_start')) / 60000);
        var new_min = diff + parseInt(last_filled[1]);
        var new_val = last_filled[0] + ':' + new_min;
        console.log(JSON.stringify(new_val));
        last_input.focus();
        last_input.val(new_val).trigger('blur');

        update_timeout = window.setTimeout(updateTime, 60000);
    }

    function startTaskTrackbutt(butt){
        butt.val('Stop');
        butt.closest('tr.actualRow').css('border', '1px solid red');

        last_input = butt.closest('tr').find('input.inputTT').last();
        var last_filled = last_input.val() || '0:00';
        last_input.data('last_filled', last_filled);
        last_input.data('track_start', Date.now());
        updateTime();
    }



    var rows = jQuery('#actualTTRows > tr');
    var trackerButt = jQuery('<input class="tracker" type="button" value="Track" />');
    trackerButt.click(trackTask);
    rows.append(trackerButt);



})();
