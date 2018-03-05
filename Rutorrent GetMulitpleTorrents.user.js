// ==UserScript==
// @name        Rutorrent GetMulitpleTorrents
// @namespace   rutorrent
// @description gets multiple torrents which you select in rutorrent
// @include     http://*ruTorrent*
// @include     https://*ruTorrent*
// @version     2.3
// @grant       none
// @downloadURL  https://github.com/hannsen/userscripts/raw/master/Rutorrent%20GetMulitpleTorrents.user.js
// @updateURL    https://github.com/hannsen/userscripts/raw/master/Rutorrent%20GetMulitpleTorrents.user.js
// ==/UserScript==

function insertAfter(newElement,targetElement) {
    // target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    // if the parents lastchild is the targetElement...
    if (parent.lastChild == targetElement) {
        // add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


var butt = document.getElementById("mnu_help");


var unfoldLink = document.createElement('a');
var newHTML = document.createElement ('div');
newHTML.id = 'moved';
unfoldLink.appendChild(newHTML);
unfoldLink.id = 'grab';
unfoldLink.title = 'Download selected torrent files';
unfoldLink.href = 'javascript:void(0)';
//unfoldLink.setAttribute('onclick', 'getTorrents()');


insertAfter(unfoldLink, butt);



document.getElementById('grab').addEventListener('click', getTorrents, false);


function getTorrents(){
  var selected = document.getElementsByClassName("selected");
  for (var i=0;i<(selected.length-3);i++){
    
    window.open(window.location + '/plugins/source/action.php?hash=' + selected[i].id);
   //alert(selected[i].id);

  }
}
