// ==UserScript==
// @name         GitHub Shopware - Copy extends path
// @namespace    ott
// @version      2
// @description  Add btn to copy path for template extension
// @author       Thomas Lesinski
// @include      https://github.com/shopware/platform*
// @include      https://github.com/shopware/shopware*
// @grant        none
// @downloadURL  https://github.com/ottschoIT/tampermonkey-bundle/raw/main/GitHub%20Shopware%20-%20Copy%20extends%20path.user.js
// ==/UserScript==

(function(){'use strict';console.log(123);const m=setInterval(d,0xfa);function d(){const y=document['querySelector']('.btn-copy-extends-path');if(y)return;const o=c();let b='';if(o==='hide')return;else o===''&&(b='disabled');const v=r(o),s=k(b,v);let z=document['querySelector']('.js-pjax-capture-input');!z&&(z=document['querySelector']('.file-navigation\x20.btn.mr-2.d-none.d-md-block'));!z&&(z=document['querySelector']('h2\x20~\x20[data-hotkey=\x22t\x22]'));if(z==undefined){console['log']('Go\x20to\x20file\x20btn\x20not\x20found');return;}const e=z['parentNode'];document['querySelector']('body')['append'](v),e['insertBefore'](s,z);function r(x){const g=document['createElement']('input');return g['type']='text',g['style']['opacity']='0',g['value']=x,g;}function k(p,q){const j=document['createElement']('div');return j['innerHTML']='Copy\x20extends\x20path',j['classList']['add']('btn-copy-extends-path','btn','mr-2','d-none','d-md-block'),p!==''&&j['classList']['add'](p),j['addEventListener']('click',()=>{q['select'](),document['execCommand']('copy');}),j;}function c(){const a=[];let t='',w=![],i=![];const u=document['querySelectorAll']('.file-navigation\x20.js-path-segment')['length']>0x0?document['querySelectorAll']('.file-navigation\x20.js-path-segment'):document['querySelectorAll']('#blob-path\x20.js-path-segment');if(u['length']>0x0){const n=document['querySelector']('.final-path')['innerText']['trim']()['toLowerCase']();if(n['includes']('.tpl')||n['includes']('.html.twig'))u['forEach'](f=>{const l=f['innerText']['trim']()['toLowerCase']();w&&i&&a['push'](l),!w&&(l==='resources'||l==='frontend')&&(w=!![]),!i&&(l==='views'||l==='bare')&&(i=!![]);}),a['length']>0x0&&(a['push'](n),t=a['join']('/'));else return'hide';}return t;}}}());
