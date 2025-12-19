// ==UserScript==
// @name         Pokémon Zone Card Extractor (fixed counts + rarity)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Extract card name, rarity (from span icons), and exact count from Pokémon Zone player collection pages and download CSV.
// @match        https://www.pokemon-zone.com/players/*/cards/*
// @grant        GM_download
// @run-at       document-idle
// ==/UserScript==

(function(){
  'use strict';

  const ROW_SELECTOR = '.player-expansion-collection-card';
  const BTN_ID = 'pz-card-extractor-btn-v2';

  function symbolForClassName(cls){
    if(!cls) return '★';
    cls = cls.toLowerCase();
    if(cls.includes('diamond')) return '◆';
    if(cls.includes('star')) return '★';
    if(cls.includes('crown')) return '♛';
    if(cls.includes('heart')) return '❤';
    return '★';
  }

  function extractCards(){
    const rows = Array.from(document.querySelectorAll(ROW_SELECTOR));
    const cards = rows.map(card => {
      // name
      const nameEl = card.querySelector('.player-expansion-collection-card__name-text');
      const name = nameEl ? nameEl.textContent.trim() : 'Unknown';

      // rarity: look for .rarity-icon__icon only (these are span icons)
      let rarity = '';
      const rarityContainer = card.querySelector('.player-expansion-collection-card__name-rarity, .player-expansion-collection-card__rarity, .rarity-icon');
      if(rarityContainer){
        const icons = Array.from(rarityContainer.querySelectorAll('.rarity-icon__icon'));
        if(icons.length){
          icons.forEach(ic => {
            const cls = (ic.className || '').toString();
            rarity += symbolForClassName(cls);
          });
        }
      }

      const fullName = rarity ? `${name} (${rarity})` : name;

      // IMPORTANT: Only read the exact COUNT element.
      const countEl = card.querySelector('.player-expansion-collection-card__count');
      let count = 0;
      if(countEl){
        const txt = (countEl.textContent || '').trim();
        const num = parseInt(txt.replace(/[^\d]/g,''), 10);
        count = Number.isFinite(num) ? num : 0;
      } else {
        count = 0;
      }

      return { name: fullName, count };
    });

    return cards;
  }

  function toCSV(rows){
    const header = ['Card Name (with Rarity)','Count'];
    const lines = [header.join(',')];
    lines.push(...rows.map(r => `"${r.name.replace(/"/g,'""')}",${r.count}`));
    return '\uFEFF' + lines.join('\n');
  }

  function downloadCSV(rows, filename='pokemon_cards.csv'){
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    if(typeof GM_download === 'function'){
      try{
        GM_download({ url, name: filename, saveAs: true });
        return;
      }catch(e){
        console.warn('GM_download failed, falling back to anchor', e);
      }
    }
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  function addButtonIfNeeded(){
    if(document.getElementById(BTN_ID)) return;
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.textContent = 'Extract Pokémon Cards';
    Object.assign(btn.style, {
      position:'fixed', top:'100px', right:'20px', zIndex:999999, padding:'10px 12px',
      background:'#ffcc00', border:'2px solid #333', borderRadius:'6px', cursor:'pointer', fontWeight:'600'
    });
    btn.addEventListener('click', ()=> {
      const cards = extractCards();
      if(!cards.length){
        alert('No cards found yet. Wait until the page renders and try again.');
        return;
      }
      downloadCSV(cards);
      alert(`Extracted ${cards.length} cards — CSV should download.`);
    });
    document.body.appendChild(btn);
  }

  function waitForCardsAndAddButton(){
    if(document.querySelector(ROW_SELECTOR)){
      addButtonIfNeeded();
    }
    const obs = new MutationObserver((mutations)=> {
      if(document.querySelector(ROW_SELECTOR)) addButtonIfNeeded();
    });
    obs.observe(document.body, { childList:true, subtree:true });
    // as fallback try after short delays
    setTimeout(addButtonIfNeeded, 2000);
    setTimeout(addButtonIfNeeded, 5000);
  }

  waitForCardsAndAddButton();

})();
