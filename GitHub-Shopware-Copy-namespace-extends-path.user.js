// ==UserScript==
// @name         GitHub Shopware - Copy namespace/extends path
// @namespace    ott
// @version      1
// @description  Add button to copy namespace/extends path
// @author       Thomas Lesinski
// @include      https://github.com/shopware/platform*
// @include      https://github.com/shopware5/shopware*
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Shopware-Copy-namespace-extends-path.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Shopware-Copy-namespace-extends-path.user.js
// ==/UserScript==
!function(){"use strict";const e="ott-copy-button";setInterval((()=>{const t=Array.from(document.querySelectorAll("#repos-header-breadcrumb-wide a")).map((e=>e.innerText.trim())),n=t.map((e=>e.toLowerCase()));if(!document.querySelector("#file-name-id-wide"))return;const r=document.querySelector("#file-name-id-wide").innerText.trim();let i="",o="",c=null;function l(){navigator.clipboard.writeText(i)}r.includes(".tpl")||r.includes(".html.twig")?("resources"===n[3]&&"views"===n[4]?c=5:"frontend"===n[2]&&"bare"===n[3]&&(c=4),null!==c&&(i=`${n.slice(c).join("/")}/${r}`),o="Copy extends path"):r.includes(".php")&&("platform"===n[0]?c=2:"shopware"!==n[0]||"engine"!==n[1]&&"library"!==n[1]||(c=3),null!==c&&(i=`use Shopware\\${t.slice(c).join("\\")}\\${r.replace(".php","")};`),o="Copy namespace");const s=document.querySelector(`.${e}`);if(""!==i)if(s)s.removeEventListener("click",l),s.addEventListener("click",l),s.removeAttribute("disabled"),s.innerText=o;else{const t=document.createElement("button");t.setAttribute("type","button"),t.classList.add("btn",e),t.innerText=o,t.addEventListener("click",l);const n=document.querySelector("#StickyHeader [data-testid=more-file-actions-button]");n.parentElement.insertBefore(t,n)}else s&&(""===o&&s.remove(),s.setAttribute("disabled","true"),s.innerText=o,s.removeEventListener("click",l))}),250)}();
