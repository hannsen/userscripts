// ==UserScript==
// @name        Rutorrent GetMulitpleTorrents
// @namespace   rutorrent
// @description gets multiple torrents which you select in rutorrent
// @include     http://*ruTorrent*
// @include     https://*ruTorrent*
// @version     2.1
// @grant       none
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
var linkText = document.createTextNode('[get selected torrent files]');
unfoldLink.appendChild(linkText);
unfoldLink.id = 'unfoldLink';
unfoldLink.title = 'get selected torrent files';
unfoldLink.href = 'javascript:void(0)';
//unfoldLink.setAttribute('onclick', 'getTorrents()');


insertAfter(unfoldLink, butt);



document.getElementById('unfoldLink').addEventListener('click', getTorrents, false);


function getTorrents(){
  var selected = document.getElementsByClassName("selected");
  for (var i=0;i<(selected.length-3);i++){
    
    window.open(window.location + '/plugins/source/action.php?hash=' + selected[i].id);
   //alert(selected[i].id);

  }
}
