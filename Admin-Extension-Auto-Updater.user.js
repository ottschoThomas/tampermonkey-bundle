// ==UserScript==
// @name         Admin Extension Auto Updater
// @namespace    ott
// @version      1
// @description  Auto update extensions in administration
// @author       Thomas Lesinski
// @match        http://localhost/*
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// @grant        none
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Admin-Extension-Auto-Updater.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Admin-Extension-Auto-Updater.user.js
// ==/UserScript==

(function() {
    'use strict';

    console.log("(Step 1 / 6) Executing script Admin Extension Auto Updater");

    const updateOnlyActiveExtensions = false;
    let extensionToSkip = [
        '',
    ];

    extensionToSkip = extensionToSkip.map(entry => entry.toLowerCase());

    if (window.location.hash.includes('/sw/extension/my-extensions/listing/app')) {
        console.log("(Step 2 / 6) Found extension page");

        const interval = setInterval(() => {
            console.log("(Step 3 / 6) Waiting for extensions to load");

            if (document.querySelector('.sw-extension-card-base')) {
                console.log("(Step 4 / 6) Extensions are loaded");

                const anchors = document.querySelectorAll('.sw-extension-card-base__meta-info a[href="#"]');

                for (const anchor of anchors) {
                    const card = anchor.closest('.sw-extension-card-base');
                    const extensionName = card.querySelector('.sw-extension-card-base__info-name').innerText;
                    const extensionVersion = card.querySelector('.sw-extension-card-base__meta-info-version').innerText;
                    const extensionIsActive = card.querySelector('.sw-field--switch__input input').checked;

                    if (
                        ['aktualisierung', 'update'].includes(anchor.innerText.toLowerCase())
                        && !extensionToSkip.includes(extensionName.toLowerCase())
                        && (
                            updateOnlyActiveExtensions
                            && extensionIsActive
                            || !updateOnlyActiveExtensions
                        )
                    ) {
                        console.log(`(Step 5 / 6) Updating plugin: ${extensionName} - ${extensionVersion}`);

                        const headArea = document.querySelector('.sw-meteor-page__head-area');
                        const style = getComputedStyle(headArea);
                        const heightWithMargin = headArea.offsetHeight + parseInt(style.marginTop) + parseInt(style.marginBottom);

                        document.querySelector('.sw-meteor-page__body').scrollTo({
                            top: anchor.getBoundingClientRect().top + window.scrollY - heightWithMargin,
                            behavior: 'smooth'
                        });
                        anchor.click();

                        break;
                    }
                }

                console.log("(Step 6 / 6) Script executing finished");
                clearInterval(interval);
            }
        }, 250);
    }
})();
