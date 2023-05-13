// ==UserScript==
// @name         GitHub - Fix pr title
// @namespace    ott
// @version      1
// @description  Add button to fix pr title
// @author       Thomas Lesinski
// @include      https://github.com/*
// @grant        none
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Fix-pr-title.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Fix-pr-title.js
// ==/UserScript==
!function(){"use strict";setInterval((()=>{const e=document.querySelector(".discussion-topic-header");if(!document.querySelector(".btn-fix-pr-title")&&e){const t=document.querySelector("#pull_request_title");t.parentElement.style.flexGrow="1";const n=document.createElement("div");n.classList.add("btn","btn-fix-pr-title"),n.innerHTML="Fix",n.addEventListener("click",(()=>{const e=t.value.trim().split(" ");t.value=`[${e[0].toUpperCase()}-${e[1]}] ${e.slice(2,e.length).join(" ")}`})),e.classList.add("d-flex"),e.append(n)}}),250)}();