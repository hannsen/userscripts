// ==UserScript==
// @name CAW CAW FLAG LIGHTS
// @include http://*.koalabeast.com:*
// @include http://*.jukejuice.com:*
// @include http://*.newcompte.fr:*
// @version 0.4
// ==/UserScript==

/*
 * CAW CAW Flag Lights by ??
 * Edited by ScHoolball Q
 * Colors adjusted by ----)
*/

var game = 0,
    red = 0,
    blue = 0,
    flags = {},
    oldCSS = "",
    css = "",
    flagHeld = 0,
    lastFlagHeld = 0;
    
// Blue CSS
var blueCSS = {
  background: "#00007f", /* Old browsers */
  background: "-moz-radial-gradient(center, ellipse cover, #00007f 33%, #000000 99%)", /* FF3.6+ */
  background: "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(33%,#00007f), color-stop(99%,#000000))", /* Chrome,Safari4+ */
  background: "-webkit-radial-gradient(center, ellipse cover, #00007f 33%,#000000 99%)", /* Chrome10+,Safari5.1+ */
  background: "-o-radial-gradient(center, ellipse cover, #00007f 33%,#000000 99%)", /* Opera 12+ */
  background: "-ms-radial-gradient(center, ellipse cover, #00007f 33%,#000000 99%)", /* IE10+ */
  background: "radial-gradient(ellipse at center, #00007f 33%,#000000 99%)", /* W3C */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#00007f', endColorstr='#000000',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
};
// Red CSS
var redCSS = {
  background: "#7f0000", /* Old browsers */
  background: "-moz-radial-gradient(center, ellipse cover, #7f0000 33%, #000000 99%)", /* FF3.6+ */
  background: "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(33%,#7f0000), color-stop(99%,#000000))", /* Chrome,Safari4+ */
  background: "-webkit-radial-gradient(center, ellipse cover, #7f0000 33%,#000000 99%)", /* Chrome10+,Safari5.1+ */
  background: "-o-radial-gradient(center, ellipse cover, #7f0000 33%,#000000 99%)", /* Opera 12+ */
  background: "-ms-radial-gradient(center, ellipse cover, #7f0000 33%,#000000 99%)", /* IE10+ */
  background: "radial-gradient(ellipse at center, #7f0000 33%,#000000 99%)", /* W3C */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#7f0000', endColorstr='#000000',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
};
// Purple CSS
var redBlueCSS = {
  background: "#7f007f", /* Old browsers */
  background: "-moz-radial-gradient(center, ellipse cover, #7f007f 33%, #000000 99%)", /* FF3.6+ */
  background: "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(33%,#7f007f), color-stop(99%,#000000))", /* Chrome,Safari4+ */
  background: "-webkit-radial-gradient(center, ellipse cover, #7f007f 33%,#000000 99%)", /* Chrome10+,Safari5.1+ */
  background: "-o-radial-gradient(center, ellipse cover, #7f007f 33%,#000000 99%)", /* Opera 12+ */
  background: "-ms-radial-gradient(center, ellipse cover, #7f007f 33%,#000000 99%)", /* IE10+ */
  background: "radial-gradient(ellipse at center, #7f007f 33%,#000000 99%)", /* W3C */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#7f007f', endColorstr='#000000',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
};
// Grey CSS
var greyCSS = {
  background: "#636363", /* Old browsers */
  background: "-moz-radial-gradient(center, ellipse cover, #636363 33%, #000000 99%)", /* FF3.6+ */
  background: "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(33%,#636363), color-stop(99%,#000000))", /* Chrome,Safari4+ */
  background: "-webkit-radial-gradient(center, ellipse cover, #636363 33%,#000000 99%)", /* Chrome10+,Safari5.1+ */
  background: "-o-radial-gradient(center, ellipse cover, #636363 33%,#000000 99%)", /* Opera 12+ */
  background: "-ms-radial-gradient(center, ellipse cover, #636363 33%,#000000 99%)", /* IE10+ */
  background: "radial-gradient(ellipse at center, #636363 33%,#000000 99%)", /* W3C */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#636363', endColorstr='#000000',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
};
var yellowCSS = {
  background: "#d1960c", /* Old browsers */
  background: "-moz-radial-gradient(center, ellipse cover, #d1960c 34%, #000000 99%)", /* FF3.6+ */
  background: "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(34%,#d1960c), color-stop(99%,#000000))", /* Chrome,Safari4+ */
  background: "-webkit-radial-gradient(center, ellipse cover, #d1960c 34%,#000000 99%)", /* Chrome10+,Safari5.1+ */
  background: "-o-radial-gradient(center, ellipse cover, #d1960c 34%,#000000 99%)", /* Opera 12+ */
  background: "-ms-radial-gradient(center, ellipse cover, #d1960c 34%,#000000 99%)", /* IE10+ */
  background: "radial-gradient(ellipse at center, #d1960c 34%,#000000 99%)", /* W3C */
  filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#d1960c', endColorstr='#000000',GradientType=1 )", /* IE6-9 fallback on horizontal gradient */
};
var yellowRedCSS = {background: "linear-gradient(90deg, rgba(255,255,0,1), rgba(0,0,0,1))"};
var yellowBlueCSS = {background: "linear-gradient(90deg, rgba(0,0,0,1), rgba(255,255,0,1))"};
var yellowRedBlueCSS = {background: "linear-gradient(90deg, rgba(255,255,0,1), rgba(255,255,0,1))"};

init();
function init() {
    // default values
    $("html").css("background-color", "rgba(0,0,0,0.25)");
    $("html").css(greyCSS);

    if (!tagpro.map) return setTimeout(function(){init();},0);
    checkPlayers();
    tagpro.socket.on("p", function(message) {
        if(!Array.isArray(message)) message = [message];

        for (var i = 0; i < message.length; i++) {
            var data = message[i].u;

            if(data !== undefined) {
                if (tagpro)
                for(var j = 0; j < data.length; j++) {
                    if(data[j].flag || typeof data[j].flag == "object") { // a flag exists
                        flagHeld = 1;
                        checkPlayers();
                    }
                }
            }
        }
        if(!flagHeld && lastFlagHeld) {setColor(0,0,0); flagHeld = 0;} // what type of game doesn't matter
        lastFlagHeld = flagHeld;
    });
}

function checkPlayers() {
    var oldgame = game, oldred = red, oldblue = blue;

    game = 1, red = 0, blue = 0; // assume CTF game

    for (var id in tagpro.players) {
        var player = tagpro.players[id];

        /*
         * FYI:
         *
         * player.flag == null, no flag (CTF && NF)
         * player.flag == 1, red flag (CTF)
         * player.flag == 2, blue flag (CTF)
         * player.flag == 3, yellow flag (NF)
         *
         * player.team == 1, red team
         * player.team == 2, blue team
         */
        switch (player.flag) {
            case 3: // NF Games
                game = 0;
            case 2: // CTF Games
            case 1:
                if (player.team == 1) red = 1;
                else if (player.team == 2) blue = 1;
        }
    }

    if (oldgame !== game || oldred !== red || oldblue !== blue) {
        setColor(game, red, blue);
    }
}

function setColor (game, red, blue) {
    css = greyCSS; // by default

    if (game === 0) { // NF Games
        if (red && blue) css = yellowRedBlueCSS;
        else if (red) css = redCSS;
        else if (blue) css = blueCSS;
    } else if (game === 1) { // CTF Games
        if (red && blue) css = redBlueCSS;
        else if (red) css = redCSS;
        else if (blue) css = blueCSS;
    }

    if (css != oldCSS) {
        $("html").css(css);
        oldCSS = css;
    }
}
