// ==UserScript==
// @name         Symfony Dump
// @namespace    ott
// @version      1
// @description  Hover a symfony dump and press ctrl + altleft + o to open it in fullscreen
// @author       Thomas Lesinski
// @include      *://*/*
// @include      localhost
// @grant        none
// @icon         https://www.google.com/s2/favicons?domain=ottscho-it-service.de
// @noframes
// @downloadURL  https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Symfony-Dump.user.js
// @updateURL    https://github.com/ottschoThomas/tampermonkey-bundle/raw/main/Symfony-Dump.user.js
// ==/UserScript==

(function(window) {
    'use strict';

    class OttSymfonyDump {
        init () {
            if ('undefined' === typeof window.PluginManager || 'undefined' === typeof window.Sfdump) {
                return;
            }

            this.createStyle();
            this.handleKeyboard();
        }

        createStyle() {
            document.body.insertAdjacentHTML(
                'beforeend',
                `<style>
                    #ott-symfony-dump {
                        padding-right: 3rem;
                    }

                    .ott-symfony-dump-modal {
                        background: #18171b;
                        bottom: 0;
                        left: 0;
                        overflow-y: scroll;
                        position: fixed;
                        right: 0;
                        top: 0;
                        z-index: 2147483647;
                    }
                    
                    .ott-symfony-dump-modal .sf-dump {
                        margin: 0;
                    }
                    
                    .ott-symfony-dump-modal .sf-dump-search-wrapper {
                        padding-left: 75%;
                        padding-right: 4rem;
                    }
                    
                    .ott-symfony-dump-modal-content {
                        position: relative;
                    }
                    
                    .ott-symfony-dump-modal-close {
                        cursor: pointer;
                        font-size: 30px;
                        position: fixed;
                        right: 22px;
                        top: 0;
                        z-index: 2147483647;
                    }
                    
                    .ott-symfony-dump-trigger {
                        height: 30px;
                        line-height: 20px;
                    }
                </style>`
            );
        }

        handleKeyboard() {
            this.keyStates = {
                controlleft: false,
                altleft: false,
                keyo: false,
            };

            document.addEventListener('keydown', event => {
                const eventCode = event?.code?.toLowerCase();

                if (!(eventCode in this.keyStates)) {
                    return;
                }

                this.keyStates[eventCode] = true;
                let shouldOpenDump = true;

                for (const keyCode in this.keyStates) {
                    if (false === this.keyStates[keyCode]) {
                        shouldOpenDump = false;

                        break;
                    }
                }

                if (shouldOpenDump) {
                    this.openDumpAtCursor();

                    Object.keys(this.keyStates).forEach(keyCode => this.keyStates[keyCode] = false);
                }
            });

            document.addEventListener('keyup', event => {
                const eventCode = event?.code?.toLowerCase();

                if (eventCode in this.keyStates) {
                    this.keyStates[eventCode] = false;
                }
            });
        }

        openDumpAtCursor() {
            const allHoveredElements = Array.from(document.querySelectorAll(':hover'));

            if (!allHoveredElements.length) {
                return;
            }

            const hoveredElement = allHoveredElements[allHoveredElements.length - 1];
            let dump = hoveredElement;

            if (null !== dump.closest('.ott-symfony-dump-modal')) {
                return;
            }

            if (!Array.from(hoveredElement.classList).includes('sf-dump')) {
                dump = hoveredElement.closest('.sf-dump');
            }

            if (null === dump) {
                return;
            }

            this.openDump(dump);
        }

        createModal() {
            document.querySelector('.ott-symfony-dump-modal')?.remove();

            this.modal = document.createElement('div');
            this.modal.classList.add('ott-symfony-dump-modal');

            this.modalContentWrapper = document.createElement('div');
            this.modalContentWrapper.classList.add('ott-symfony-dump-modal-content');
            this.modal.appendChild(this.modalContentWrapper);

            this.modalCloseButton = document.createElement('div');
            this.modalCloseButton.classList.add('ott-symfony-dump-modal-close');
            this.modalCloseButton.innerHTML = '❌';
            this.modalCloseButton.addEventListener('click', this.hideModal.bind(this));
            this.modal.appendChild(this.modalCloseButton);

            document.body.appendChild(this.modal);
        }

        openDump(dump) {
            dump = dump.cloneNode(true);
            dump.id = 'ott-symfony-dump';

            dump.querySelectorAll('span').forEach(span => {
                if ('▼' === span.innerHTML || '▶' === span.innerHTML) {
                    span.remove();
                }
            });

            document.body.classList.add('overflow-hidden');

            this.createModal();
            this.modalContentWrapper.innerHTML = '';
            this.modalContentWrapper.appendChild(dump);

            window.Sfdump('ott-symfony-dump');
        }

        hideModal() {
            document.body.classList.remove('overflow-hidden');
            this.modal.style.display = 'none';
        }
    }

    window.OttSymfonyDump = new OttSymfonyDump();
    window.OttSymfonyDump.init();
})(window);
