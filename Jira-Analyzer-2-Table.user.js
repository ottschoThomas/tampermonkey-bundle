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

(function() {
    'use strict';

    // Excluded tickets (e.g. internal tickets)
    const excludedKeys = [
        'SUP-10613',
        'SUP-13472',
        'SUP-13473',
        'SUP-6295',
        'SUP-4017',
        'SUP-26320',
        'SUP-6367',
        'SUP-22815',
        'SUP-28781',
    ];

    document.querySelector('#content').style.padding = '20px';
    document.querySelector('table').scrollIntoView();

    const container = document.createElement('div');
    container.classList.add('mt-3');

    let containerContent = '<div>Zuletzt:</div><ul>';

    const items = [];
    document.querySelectorAll('table tr:not(:first-of-type)').forEach(row => {
        const key = row.querySelector('td:nth-child(1)')?.innerHTML.trim();
        const name = row.querySelector('td:nth-child(2)')?.innerHTML.trim();
        const label = row.querySelector('td:nth-child(8)')?.innerHTML.trim();
        const comment = row.querySelector('td:nth-child(9)')?.innerHTML.trim();

        if (!excludedKeys.includes(key)) {
            'Summe' !== key && 'Gesamtsumme' !== key && items.push({ key, label, name, comment });
        }
    });

    let result = 'Zuletzt:\n';

    items.forEach(item => {
        result += item + '\n';
        containerContent += `<li>${item.key} ${item.label} ${item.name}</li>`;

        if ('' !== item.comment) {
            containerContent += `<ul><li>${item.comment}</li></ul>`;
        }
    });

    containerContent += '</ul><br><div>Aktuell:</div><br>';
    container.innerHTML = containerContent;

    const resultTable = document.querySelector('table');
    resultTable.parentNode.insertBefore(container, resultTable.nextSibling);
})();
