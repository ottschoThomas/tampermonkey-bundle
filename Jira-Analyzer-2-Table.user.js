// ==UserScript==
// @name         Jira Analyzer - 2. Table
// @namespace    ott
// @version      1
// @description  Jira Analyzer Table adjustments
// @author       Thomas Lesinski
// @match        http://jira.ottscho-it-service.de/analyze/show
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Jira-Analyzer-2-Table.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Jira-Analyzer-2-Table.user.js
// @grant        none
// ==/UserScript==
!function(){"use strict";
    // Excluded tickets (e.g. internal tickets)
    const e = [
        'SUP-10613',
    ];

    document.querySelector("#content").style.padding="20px",document.querySelector("table").scrollIntoView();const t=document.createElement("div");t.classList.add("mt-3");let n="<div>Zuletzt:</div><ul>";const l=[];document.querySelectorAll("table tr:not(:first-of-type) td:first-of-type").forEach((t=>{const n=t.innerHTML.trim(),r=t.nextElementSibling.innerHTML.trim();e.includes(n)||"Summe"!==n&&"Gesamtsumme"!==n&&l.push({key:n,name:r})}));let r="Zuletzt:\n";l.forEach((e=>{r+=e+"\n",n+=`<li>${e.key} ${e.name}</li>`})),n+="</ul><br><div>Aktuell:</div><br>",t.innerHTML=n;const i=document.querySelector("table");i.parentNode.insertBefore(t,i.nextSibling)
}();
