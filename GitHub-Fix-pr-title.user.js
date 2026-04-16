// ==UserScript==
// @name         GitHub - Fix pr title
// @namespace    ott
// @version      1
// @description  Add button to fix pr title
// @author       Thomas Lesinski
// @include      https://github.com/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Fix-pr-title.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/GitHub-Fix-pr-title.user.js
// ==/UserScript==

(function() {
    'use strict';

    const interval = setInterval(() => {
        const anchorEl = document.querySelector('.discussion-topic-header');

        if (!document.querySelector('.btn-fix-pr-title') && anchorEl) {
            const prTitleInput = document.querySelector('[name="pull_request[title]"]');
            prTitleInput.parentElement.style.flexGrow = '1';

            const btnFixPrTitle = document.createElement('div');
            btnFixPrTitle.classList.add('btn', 'btn-fix-pr-title');
            btnFixPrTitle.innerHTML = 'Fix';

            btnFixPrTitle.addEventListener('click', () => {
                const prTitleText = prTitleInput.value.trim();
                const prTitleTextSplit = prTitleText.split(' ');
                prTitleInput.value = `[${prTitleTextSplit[0].toUpperCase()}-${prTitleTextSplit[1]}] ${prTitleTextSplit.slice(2, prTitleTextSplit.length).join(' ')}`;
            });

            prTitleInput.parentElement.insertAdjacentElement('afterend', btnFixPrTitle);
        }
    }, 250);
})();
