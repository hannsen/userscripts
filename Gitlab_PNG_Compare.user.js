// ==UserScript==
// @name         Gitlab PNG Compare
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       hannsen
// @match        https://git04.quodata.de/*/merge_requests/*
// @grant        none
// @downloadURL  https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab_PNG_Compare.user.js
// @updateURL    https://git04.quodata.de/quodata/userscripts/-/raw/master/Gitlab_PNG_Compare.user.js
// ==/UserScript==

(function() {
    'use strict';

     function onScreen (el) {
        return (jQuery(window).scrollTop() <= el.offset().top + el.height() &&
                jQuery(window).scrollTop() + jQuery(window).height() >= el.offset().top);
    };


    function replaceImgView(){
        jQuery('div.diff-file.file-holder').each(function(){
            var $this = jQuery(this);
            if(!onScreen($this)){
                return;
            }

            var $diffView = $this.find('div.diff-viewer');
            var $container = $this.parent().parent();
            var datapath = $this.attr('data-path');
            if(!datapath.endsWith('.png')){
                setTimeout(function() {
                    removeWronglyPlacedImgCompare($container);
                }, 50)
                return;
            }


            var $imgcmp = $container.find('div.img_compare');
            if($imgcmp[0] && $imgcmp.attr('data-path') == datapath){
                return;
            }

            $imgcmp.remove();

            var $diff_button = $this.find('button > .gl-button-text');
            if($diff_button){
                $diff_button.click();
            }

            setTimeout(function() {
                startBuildImgCompare($this, datapath);
            }, 50)
        });
    }

    function removeWronglyPlacedImgCompare($container){
        $container.find('div.img_compare').remove();
        $container.find('div.diff-viewer').show();
    }

    function startBuildImgCompare($this, datapath){
        $this.find('div.diff-viewer').hide();
        var $dl_links = $this.find('.gl-new-dropdown-item > a[role="menuitem"]');
        if(!$dl_links[0]){
            $dl_links = $this.find('a.view-file');
        }

        if($dl_links[0]){
                if(!$dl_links[1]){
                    // Lets check if there really is no old picture
                    var $old_pic_link = $this.find('.diff-viewer .deleted a[data-qa-selector="download_button"]');
                    if($old_pic_link[0]){
                        $dl_links = [$old_pic_link[0], $dl_links[0]];
                    }
                }
            var old_url = $dl_links[0].href.replace('/blob/', '/raw/');
            var new_url = $dl_links[1] ? $dl_links[1].href.replace('/blob/', '/raw/') : old_url;


        }

        var $img = buildImgCompare(old_url, new_url);
        $img.css('border', 'solid 1px black');
        $img.attr('data-path', datapath);
        $this.after($img);
    }

    function buildImgCompare(old_url, new_url){
        var div = jQuery('<div class="img_compare"><div/>');
        var img_old = jQuery('<img class="img_old" src="' + old_url + '"/>');
        var img_new = jQuery('<img class="img_new" src="' + new_url + '"/>').css('display', 'none');
        var old_desc = "old< new";
        var new_desc = "old >new";
        if(old_url == new_url) {
            old_desc = new_desc = 'new';
        }
        var pre = '<pre>' + old_desc + '</pre><br>';
        div.append(pre,img_old, img_new, pre);

        var switch_pic = function(){
            var $this = jQuery(this);
            var img_old = $this.find('.img_old');
            var img_new = $this.find('.img_new');
            var show_old = img_old.css('display') == 'none';
            $this.find('pre').text(show_old ? old_desc : new_desc);
            img_old.css('display', show_old ? 'block' : 'none');
            img_new.css('display', show_old ? 'none' : 'block');
        };

        div.mouseenter(switch_pic).mouseleave(switch_pic);

        return div;
    }

    var scrollTimeout;
    window.onscroll = function(){
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(replaceImgView, 50);
    };

})();
