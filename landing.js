'use strict';

// The rendered page, its links and FAQ work without JavaScript.
const lightbox = document.querySelector('#screenshot-dialog');
if (lightbox && typeof lightbox.showModal === 'function') {
  const largeImage = lightbox.querySelector('img');
  const caption = lightbox.querySelector('[data-caption]');
  document.querySelectorAll('.screen-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      largeImage.src = trigger.href;
      largeImage.alt = trigger.dataset.caption;
      caption.textContent = trigger.dataset.caption;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    const r = lightbox.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) lightbox.close();
  });
}

document.querySelectorAll('.mobile-menu nav a').forEach((link) => {
  link.addEventListener('click', () => link.closest('details').removeAttribute('open'));
});

const languagePicker = document.querySelector('.language-picker');
if (languagePicker) {
  document.addEventListener('click', (event) => {
    if (!languagePicker.contains(event.target)) languagePicker.removeAttribute('open');
  });
  languagePicker.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && languagePicker.open) {
      languagePicker.removeAttribute('open');
      languagePicker.querySelector('summary').focus();
    }
  });
  languagePicker.addEventListener('toggle', () => {
    if (languagePicker.open) {
      const current = languagePicker.querySelector('[aria-current]');
      const list = languagePicker.querySelector('.languages');
      if (current && list) list.scrollTop = Math.max(0, current.offsetTop - list.clientHeight / 2 + current.offsetHeight / 2);
      document.querySelector('.mobile-menu')?.removeAttribute('open');
    }
  });
}

// Keep the existing Propagate legal-section links working after adding a home page.
if (document.body.dataset.app === 'propagate') {
  const key = location.hash.slice(1);
  if (/^(privacy|terms|support|addr-|copy-)/.test(key)) {
    location.replace(document.body.dataset.assetPrefix + 'community.html' + location.hash);
  } else {
    const aliases = {'ru-RU':'ru','en-US':'en','ar-SA':'ar','es-ES':'es','es-MX':'es-419','fr-FR':'fr','de-DE':'de','nl-NL':'nl','no':'nb','sl-SI':'sl'};
    const code = aliases[key] || key.replace(/-(?:IN|BD|PK)$/,'');
    const target = [...document.querySelectorAll('.languages a')].find(link => link.lang === code);
    if (target && document.documentElement.lang !== code) location.replace(target.href);
  }
}

/* Keep the chosen product-page language when opening help or privacy. */
(()=>{const script=document.currentScript;if(!script)return;const root=new URL('.',script.src);const apply=()=>{const lang=document.documentElement.lang;for(const a of document.querySelectorAll('a[href]')){const u=new URL(a.href,location.href);if(u.origin===root.origin&&['privacy.html','support.html'].some(p=>u.pathname===root.pathname+p)){u.hash=lang;a.href=u.href}}};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply()})();
