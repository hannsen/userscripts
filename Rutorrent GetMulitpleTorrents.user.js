// ==UserScript==
// https://github.com/hannsen/userscripts
// @name        Rutorrent GetMulitpleTorrents
// @namespace   rutorrent
// @description gets multiple torrents which you select in rutorrent
// @include     http://*ruTorrent*
// @include     https://*ruTorrent*
// @version     2.7
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
  var dl_link = 'plugins/source/action.php?hash=';

  if('/' != window.location.toString().slice(-1)){
    dl_link = '/' + dl_link;
  }

  for (var i=0;i<(selected.length-3);i++){
    window.open(window.location + dl_link + selected[i].id);
  }
}
