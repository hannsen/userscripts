// ==UserScript==
// @name         Gitlab PNG Compare
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       hannsen
// @match        https://git04.quodata.de/*/merge_requests/*
// @grant        none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Gitlab_PNG_Compare.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Gitlab_PNG_Compare.user.js
// ==/UserScript==

(function() {
    'use strict';


    function replaceImgView(){
        jQuery('div.file-title:not(.qd-handled)').each(function(){
            this.classList.add('qd-handled');
            var $this = jQuery(this);
            if($this.find('strong').text().trim().endsWith('.png')){
                var $dl_links = $this.next().find('a[download]');
                if(!$dl_links[0]){
                    $dl_links = $this.find('a.view-file');
                }

                if($dl_links[0]){
                    var old_url = $dl_links[0].href.replace('/blob/', '/raw/');
                    var new_url = $dl_links[1] ? $dl_links[1].href.replace('/blob/', '/raw/') : old_url;
                    $this.next().remove();
                }

                var $img = buildImgCompare(old_url, new_url);
                $img.css('border', 'solid 1px black');
                $this.after($img);
            }
        });
    }

    function buildImgCompare(old_url, new_url){
        var div = jQuery('<div><div/>');
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

    window.onscroll = replaceImgView;

})();
