// ==UserScript==
// @name         [ME] Admin Settings Appearance
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */admin*
// @icon         https://www.google.com/s2/favicons?domain=shopware.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict'

    const appearance = 2; // 1 = only color, 2 = color + static position
    const oldSettingsSelector = '#sw-settings__content-grid-system';

    const mapping = [
        {
            selector: '#sw-settings__content-group-general',
            backgroundColor: 'rgba(106, 214, 240, .25)',
            hoverBackgroundColor: 'rgba(106, 214, 240, .4)',
        },
        {
            selector: '#sw-settings__content-group-automation',
            backgroundColor: 'rgba(160, 146, 240, .25)',
            hoverBackgroundColor: 'rgba(160, 146, 240, .4)',
        },
        {
            selector: '#sw-settings__content-group-localization',
            backgroundColor: 'rgba(255, 215, 0, .25)',
            hoverBackgroundColor: 'rgba(255, 215, 0, .4)',
        },
        {
            selector: '#sw-settings__content-group-customer',
            backgroundColor: 'rgba(248, 137, 98, .25)',
            hoverBackgroundColor: 'rgba(248, 137, 98, .4)',
        },
        {
            selector: '#sw-settings__content-group-content',
            backgroundColor: 'rgba(255, 104, 180, .25)',
            hoverBackgroundColor: 'rgba(255, 104, 180, .4)',
        },
        {
            selector: '#sw-settings__content-group-commerce',
            backgroundColor: 'rgba(87, 217, 163, .25)',
            hoverBackgroundColor: 'rgba(87, 217, 163, .4)',
        },
        {
            selector: '#sw-settings__content-group-system',
            backgroundColor: 'rgba(154, 168, 181, .25)',
            hoverBackgroundColor: 'rgba(154, 168, 181, .4)',
        },
        {
            selector: '#sw-settings__content-group-plugins',
            backgroundColor: 'rgba(24, 158, 255, .25)',
            hoverBackgroundColor: 'rgba(24, 158, 255, .4)',
        },
    ];

    const fallbackColors = [
        {
            backgroundColor: 'rgba(255, 159, 67, .25)',
            hoverBackgroundColor: 'rgba(255, 159, 67, .4)',
        },
        {
            backgroundColor: 'rgba(95, 39, 205, .25)',
            hoverBackgroundColor: 'rgba(95, 39, 205, .4)',
        },
        {
            backgroundColor: 'rgba(29, 209, 161, .25)',
            hoverBackgroundColor: 'rgba(29, 209, 161, .4)',
        },
        {
            backgroundColor: 'rgba(238, 82, 83, .25)',
            hoverBackgroundColor: 'rgba(238, 82, 83, .4)',
        },
        {
            backgroundColor: 'rgba(72, 219, 251, .25)',
            hoverBackgroundColor: 'rgba(72, 219, 251, .4)',
        },
        {
            backgroundColor: 'rgba(254, 202, 87, .25)',
            hoverBackgroundColor: 'rgba(254, 202, 87, .4)',
        },
        {
            backgroundColor: 'rgba(84, 160, 255, .25)',
            hoverBackgroundColor: 'rgba(84, 160, 255, .4)',
        },
        {
            backgroundColor: 'rgba(255, 107, 107, .25)',
            hoverBackgroundColor: 'rgba(255, 107, 107, .4)',
        },
        {
            backgroundColor: 'rgba(16, 172, 132, .25)',
            hoverBackgroundColor: 'rgba(16, 172, 132, .4)',
        },
        {
            backgroundColor: 'rgba(131, 149, 167, .25)',
            hoverBackgroundColor: 'rgba(131, 149, 167, .4)',
        },
    ];

    function addHoverStyles() {
        if (document.querySelector('#ott-settings-is-processed')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'ott-settings-is-processed';
        style.textContent = mapping.map(item => {
            return `
                ${item.selector}:hover {
                    background: ${item.hoverBackgroundColor} !important;
                }

                ${item.selector} .sw-settings-item {
                    margin-left: -4px !important;
                }

                ${item.selector} .sw-settings-item:hover {
                    background: ${item.backgroundColor} !important;
                }
            `;
        }).join('');

        style.textContent += fallbackColors.map((item, index) => {
            return `
                [data-ott-settings-extra-index="${index}"]:hover {
                    background: ${item.hoverBackgroundColor} !important;
                }

                [data-ott-settings-extra-index="${index}"] .sw-settings-item {
                    margin-left: -4px !important;
                }

                [data-ott-settings-extra-index="${index}"] .sw-settings-item:hover {
                    background: ${item.backgroundColor} !important;
                }
            `;
        }).join('');

        document.head.appendChild(style);
    }

    function removeHoverStyles() {
        const style = document.querySelector('#ott-settings-is-processed');

        if (style) {
            style.remove();
        }
    }

    function getExistingMappedElement(element) {
        return mapping.find(item => element.matches(item.selector));
    }

    function applyElementStyle(element, backgroundColor) {
        element.style.background = backgroundColor;
        element.style.padding = '8px 8px 8px 12px';

        if (1 === appearance) {
            element.style.marginBottom = '24px';
        }

        if (2 === appearance) {
            element.style.marginBottom = '';
        }
    }

    function applyFroshAdminerStyle() {
        const froshAdminerElement = document.querySelector('#frosh-adminer');

        if (!froshAdminerElement) {
            return;
        }

        const settingsItem = froshAdminerElement.closest('.sw-settings-item');

        if (!settingsItem) {
            return;
        }

        settingsItem.style.background = '#95c4e7';
    }

    function applyFallbackElements(gridElement) {
        let fallbackIndex = 0;

        Array.from(gridElement.children).forEach(child => {
            if (getExistingMappedElement(child)) {
                return;
            }

            const colorIndex = fallbackIndex % fallbackColors.length;
            const colors = fallbackColors[colorIndex];

            child.dataset.ottSettingsExtraIndex = String(colorIndex);

            applyElementStyle(child, colors.backgroundColor);

            fallbackIndex++;
        });
    }

    function applyAppearance() {
        if (document.querySelector(oldSettingsSelector)) {
            removeHoverStyles();

            return false;
        }

        const gridElement = document.querySelector('.sw-settings__content-grid');

        if (!gridElement) {
            return true;
        }

        addHoverStyles();

        if (String(appearance) === gridElement.dataset.ottAppearanceApplied) {
            applyFroshAdminerStyle();

            return true;
        }

        mapping.forEach(item => {
            const element = document.querySelector(item.selector);

            if (!element) {
                return;
            }

            applyElementStyle(element, item.backgroundColor);
        });

        applyFallbackElements(gridElement);
        applyFroshAdminerStyle();

        if (2 === appearance) {
            gridElement.style.display = 'flex';
            gridElement.style.flexWrap = 'wrap';
            gridElement.style.gap = '8px';

            Array.from(gridElement.children).forEach(child => {
                child.style.flex = '0 0 calc(25% - 6px)';
                child.style.height = 'auto';
            });
        }

        gridElement.dataset.ottAppearanceApplied = String(appearance);

        return true;
    }

    const interval = setInterval(function () {
        if ('undefined' === typeof Shopware) {
            return;
        }

        if (!applyAppearance()) {
            clearInterval(interval);
        }
    }, 250);
})();
