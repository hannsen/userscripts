// ==UserScript==
// @name         Youtubemultidownloader download all at once
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download every link from youtubemultidownloader.org
// @author       You
// @match        https://youtubemultidownloader.org/
// @match        https://*.googlevideo.com/videoplayback*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtubemultidownloader.org
// @grant        none
// ==/UserScript==

(function() {

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }


    function download_all_fucken_shit (){
        var links = document.querySelectorAll('.video-card');
        for(var i = 0; i<links.length; i++){
            var title = links[i].querySelector('.titles').textContent.replace(/Size: .*/, '').trim();
            if(!title)
                continue;

            var linky = links[i].querySelector('.links a');
            if(!linky)
                continue;
            window.open(linky.href);
        }
    }


    var button = document.createElement("button");
    button.innerHTML = "download_all_fucken_shit";
    var body = document.querySelector('.continer');
    if(body){
        body.appendChild(button);

        button.addEventListener ("click", function() {
            download_all_fucken_shit();
        });
    }


    var winUrl = window.location.href.toString();
    if(winUrl.indexOf('youtubemultidownloader') > 0 && winUrl.indexOf('googlevideo.com') > 0){
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });

        let title = params.title;
        downloadURI(winUrl, title + ".m4a");
    }



})();
