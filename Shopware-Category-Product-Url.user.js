// ==UserScript==
// @name         Shopware - Category/Product url
// @namespace    ott
// @version      1
// @description  Display url in console to directly open category/product in admin
// @author       Thomas Lesinski
// @include      *
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// ==/UserScript==

(function() {
    'use strict';

    const logStyle =
        'background: #e7f3ff; color: #0066cc; font-weight: bold; padding: 2px 6px; border-radius: 4px;';
    const valueStyle =
        'color: #0099ff; font-weight: bold; text-decoration: underline;';

    const logValue = (label, value) => {
        console.log(
            `%c${label}: %c%s`,
            logStyle,
            valueStyle,
            value
        );
    };

    let activeRouteParameters = {};

    try {
        activeRouteParameters = JSON.parse(window.activeRouteParameters || '{}');
    } catch (error) {
        console.warn('Could not parse activeRouteParameters:', window.activeRouteParameters);
    }

    const referencedIdInput = document.querySelector(
        '#productDetailPageBuyProductForm input[name$="[referencedId]"]'
    );

    const productId = referencedIdInput
        ? referencedIdInput.value
        : activeRouteParameters.productId;

    if (productId) {
        window.referencedId = productId;
        window.referencedIdUrl = `${window.location.origin}/admin#/sw/product/detail/${window.referencedId}/base`;

        logValue('Product id', window.referencedId);
        logValue('Product url', window.referencedIdUrl);
    }

    if (window.activeRoute === 'frontend.landing.page') {
        if (activeRouteParameters.landingPageId) {
            window.activeLandingpageId = activeRouteParameters.landingPageId;
            window.activeLandingpageUrl = `${window.location.origin}/admin#/sw/category/landingPage/${window.activeLandingpageId}/base`;

            logValue('Landingpage id', window.activeLandingpageId);
            logValue('Landingpage url', window.activeLandingpageUrl);
        }

        return;
    }

    if (window.activeNavigationId) {
        window.activeNavigationUrl = `${window.location.origin}/admin#/sw/category/index/${window.activeNavigationId}/base`;

        logValue('Navigation id', window.activeNavigationId);
        logValue('Navigation url', window.activeNavigationUrl);
    }
})();
