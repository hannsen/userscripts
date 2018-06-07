// ==UserScript==
// @name         ggn request exporter
// @namespace    http://gazellegames.net/
// @version      0.3
// @description  press f5 if it hangs
// @author       You
// @match        https://gazellegames.net/requests.php*
// @grant GM_setValue
// @grant GM_getValue
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @grant		 GM_xmlhttpRequest

// ==/UserScript==

(function() {
    'use strict';

    if(document.location == "https://gazellegames.net/requests.php")
        GM_setValue("res",[]);

    var $links = $("a[href^='requests.php?action=view&id=']");
    var len = $links.length;
    var i = 0;
    var results = [];

    $links.each(function(){ getReq($(this).attr('href')) });


    function getReq(href){
        $.ajax({
            url: href
        })
            .done(function( data ,success, url) {
            var $site = $(data);
            let result = {};
            //todo parse to result
            result.bounty = $site.find("#formatted_bounty").text();

            result.link = "https://gazellegames.net/" + this.url.toString();

            let temptitle = $site.find(".thin h2").text().replace(/^.*?-/g,'').trim();

            result.title=
                temptitle.replace(/\(\d*?\)$/g,'');

            result.year=
                temptitle.match(/\(\d*?\)$/g) ? temptitle.match(/\(\d*?\)$/g)[0]: "-";

            result.platform=
                $site.find(".thin h2 #groupplatform a").text();

            result.gold=
                $site.find("img[title='Gold']")[0] ? 'yes' : 'no';

            result.rls_type=
                $site.find(".label:contains('Acceptable Release Types') ~ td").text().trim();

            result.language=
                $site.find(".label:contains('Acceptable Languages') ~ td").text().trim();

            result.desc=
                $site.find(".main_column_bg table tbody tr:last").text().trim();

            let filled =
                $site.find(".label:contains('Filled') ~ td a")[0] ? true : false;

            if(filled == false)
                results.push(result);

            result = {};
            i++;
            if(i === len)
                doneSite();
        });

    }

    function doneSite(){
        var endres = GM_getValue("res");
        endres = endres.concat(results);
        GM_setValue("res",endres);

        if($(".pager_next")[0]){
            $(".pager_next")[0].click();
        }
        else{
            GM_setValue("res",[]);
            download("requests.json",JSON.stringify(endres));
        }
    }

    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

})();
