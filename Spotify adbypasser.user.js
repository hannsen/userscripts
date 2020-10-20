// ==UserScript==
// @name         spotify ad-bypasser
// @namespace    https://spotify.com/
// @version      0.5
// @description  prevents crashing of the page if you use adblocker with spotify web
// @author       You
// @match        https://open.spotify.com/*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

(function () {
  'use strict';

  var config = {attributes: true, childList: true, subtree: true};
  var title_tag;

  var last_title = GM_getValue("last_title");
  console.log('last_title ' + last_title);

  var curr_title_selector = 'a[data-testid="nowplaying-track-link"]';
  var track_list_row_selector = '[data-testid="tracklist-row"] > div[aria-colindex="2"] span';

  waitForSelector(curr_title_selector, startTitleObserve);

  if (GM_getValue("page_reloaded")) {
    GM_setValue("page_reloaded", false);
    waitForSelector(track_list_row_selector, playNextSong);
  }

  function startTitleObserve (found_element) {
    title_tag = found_element;
    GM_setValue("last_title", title_tag.textContent);
    console.log('startTitleObserve ' + title_tag.textContent);
    var observer = new MutationObserver(onTitleChange);
    observer.observe(title_tag, config);
  }

  function onTitleChange () {
    var title = title_tag.textContent;
    console.log('changed ' + title);

    if (title === 'Advertisement' || title === 'Spotify') {
      GM_setValue("page_reloaded", true);
      location.reload(true);
    }
    else {
      GM_setValue("last_title", title);
    }
  }

  function waitForSelector (selector, callback) {
    var waitForLoaded = new MutationObserver(function (mutations) {
      var elem = document.querySelector(selector);
      if (elem) {
        waitForLoaded.disconnect();
        callback(elem);
      }
    });
    waitForLoaded.observe(document.body, config)
  }

  function playNextSong () {
    var titleElems = document.querySelectorAll(track_list_row_selector);
    var clickOnNext = false;
    for (var i = 0; i < titleElems.length; i++) {
      var elem = titleElems[i];
      if (clickOnNext) {
        doubleClickOn(elem);
        break;
      }
      if (elem.innerText === last_title) {
        clickOnNext = true;
      }
    }
  }

  function doubleClickOn (elem) {
    var event = new MouseEvent('dblclick', {
      'bubbles': true,
      'cancelable': true
    });
    elem.dispatchEvent(event);
    elem.style.color = 'red';
  }

})();
