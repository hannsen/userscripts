// ==UserScript==
// @name        Rutorrent GetMulitpleTorrents
// @namespace   rutorrent
// @description gets multiple torrents which you select in rutorrent
// @include     http://*ruTorrent*
// @include     https://*ruTorrent*
// @version     2.6
// @grant       none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Rutorrent%20GetMulitpleTorrents.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Rutorrent%20GetMulitpleTorrents.user.js
// ==/UserScript==

var nav_bar = document.getElementById("t");

var unfoldLink = document.createElement('a');
var newHTML = document.createElement ('div');
newHTML.id = 'moved';
unfoldLink.appendChild(newHTML);
unfoldLink.id = 'grab';
unfoldLink.title = 'Download selected torrent files';
unfoldLink.href = 'javascript:void(0)';

nav_bar.appendChild(unfoldLink);

document.getElementById('grab').addEventListener('click', getTorrents, false);


function getTorrents(){
  var selected = document.getElementsByClassName("selected");
  for (var i=0;i<(selected.length-3);i++){
    window.open(window.location + '/plugins/source/action.php?hash=' + selected[i].id);
  }
}
