// ==UserScript==
// @name         Tagpro map stats
// @namespace    https://tagpro.koalabeast.com/
// @version      0.1
// @description  Tagpro map stats
// @author       You
// @match        https://tagpro.koalabeast.com/game
// @icon         https://www.google.com/s2/favicons?domain=koalabeast.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function waitForMapname () {
        var waitForLoaded = new MutationObserver(function (mutations) {
            var elem = document.querySelector('#mapInfo');
            if (elem && elem.textContent) {
                waitForLoaded.disconnect();
                var mapname = elem.textContent.match(/Map:\s(.+)\sby/)[1];
                getMapStat(mapname);
            }
        });
        var config = {attributes: true, childList: true, subtree: true};
        waitForLoaded.observe(document.body, config)
    }

    function getMapStat(mapname){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var maps = JSON.parse(xhttp.responseText);
                var i;
                for(i in maps.rotation){
                    var map = maps.rotation[i];
                    if(map.name == mapname){
                        var msg = "Map " + mapname + ": score " + map.averageRating + "%, played " + map.totalPlays + " times";
                        // + (i + 1) + ". place in rotation";
                        setTimeout(function(){
                            tagpro.socket.emit("chat", {
                                message: msg,
                                toAll: 1,
                            });
                        }, 8000);
                        return;
                    }
                }
            }
        };
        xhttp.open("GET", "https://tagpro.koalabeast.com/maps.json", true);
        xhttp.send();
    }

    waitForMapname();

})();
