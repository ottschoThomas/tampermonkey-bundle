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
    const e=[
        "SUP-10613",
        "SUP-13472",
        "SUP-13473",
        "SUP-6295",
        "SUP-4017",
        "SUP-26320",
        "SUP-6367",
        "SUP-22815",
        "SUP-28781"
    ];

    document.querySelector("#content").style.padding="20px",document.querySelector("table").scrollIntoView();const t=document.createElement("div");t.classList.add("mt-3");let n="<div>Zuletzt:</div><ul>";const l=[];document.querySelectorAll("table tr:not(:first-of-type)").forEach((t=>{const n=t.querySelector("td:nth-child(1)")?.innerHTML.trim(),r=t.querySelector("td:nth-child(2)")?.innerHTML.trim(),c=t.querySelector("td:nth-child(8)")?.innerHTML.trim(),i=t.querySelector("td:nth-child(9)")?.innerHTML.trim();e.includes(n)||"Summe"!==n&&"Gesamtsumme"!==n&&l.push({key:n,label:c,name:r,comment:i})}));let r="Zuletzt:\n";l.forEach((e=>{r+=e+"\n",n+=`<li>${e.key} ${e.label} ${e.name}</li>`,""!==e.comment&&(n+=`<ul><li>${e.comment}</li></ul>`)})),n+="</ul><br><div>Aktuell:</div><br>",t.innerHTML=n;const c=document.querySelector("table");c.parentNode.insertBefore(t,c.nextSibling)
}();
