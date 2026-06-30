// ==UserScript==
// @name         Shopware - Set referenced product in window/console
// @namespace    ott
// @version      1
// @description  Set referenced product in window/console
// @author       Thomas Lesinski
// @include      *
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// ==/UserScript==

(function() {
    'use strict';

    const referencedIdInput = document.querySelector(
        '#productDetailPageBuyProductForm input[name$="[referencedId]"]'
    );

    if (!referencedIdInput) {
        return;
    }

    window.referencedId = referencedIdInput.value;
    window.referencedIdUrl = `${window.location.origin}/admin#/sw/product/detail/${window.referencedId}/base`;

    console.log(
        '%cReferenced product id: %c%s',
        'background: #e7f3ff; color: #0066cc; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: #0099ff; font-weight: bold; text-decoration: underline;',
        window.referencedId
    );

    console.log(
        '%cReferenced product url: %c%s',
        'background: #e7f3ff; color: #0066cc; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
        'color: #0099ff; font-weight: bold; text-decoration: underline;',
        window.referencedIdUrl
    );
})();
