// ==UserScript==
// @name         GitHub Ottscho IT org page
// @namespace    ott
// @version      1
// @description  Focus repository search input field on page load
// @author       Thomas Lesinski
// @match        https://github.com/ottschoIT?view_as=member*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Ottscho-IT-org-page.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Ottscho-IT-org-page.user.js
// ==/UserScript==
!function(){"use strict";document.querySelector("#your-repos-filter").focus()}();