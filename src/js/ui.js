(function() {
    'use strict';

    // Creamos elementos reutilizables usando Elementos Personalizados y Shadow DOM.
    function generateElementTemplate(name, shadowInnerHTML) {
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super();

                this.attachShadow({mode: 'open'});
                this.render();
            }

            render() {
                this.shadowRoot.innerHTML = shadowInnerHTML;
            }
        });
    }

    const appBarHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="../src/css/ui/app-bar.css">
    <header class="top-app-bar top-app-bar--dense">
        <div class="top-app-bar__row">
            <section class="top-app-bar__section top-app-bar__section--align-start">
                <button class="icon-button material-icons top-app-bar__navigation-icon icon-button__small">menu</button>
                <span class="top-app-bar__title">
                    <slot></slot>
                </span>
            </section>
            <section class="top-app-bar__section top-app-bar__section--align-end" role="toolbar">
                <ul>
                    <li>
                        <a class="button" href="#" tooltip-text="Unidades" tooltip-position="bottom h-centered"><span class="material-icons">menu_book</span><span class="visually-hidden">Unidades</span></a>
                    </li>
                    <li>
                        <a class="button" href="#" tooltip-text="Doná" tooltip-position="bottom h-centered"><span class="material-icons">volunteer_activism</span><span class="visually-hidden">Doná</span></a>
                    </li>
                    <li>
                        <a class="button" href="#" tooltip-text="Contacto" tooltip-position="bottom h-centered" style="--x: -12px;"><span class="material-icons">call</span><span class="visually-hidden">Contacto</span></a>
                    </li>
                </ul>
            </section>
        </div>
    </header>
    `;
    const drawerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="../src/css/ui/drawer.css">
    <aside class="drawer drawer--modal">
        <div class="drawer__header">
            <h3 class="drawer__title">${document.querySelector('app-bar').innerText}</h3>
            <!--<h4 class="drawer__subtitle"></h4>-->
        </div>
        <div class="drawer__content">
            <nav class="list">
                <a class="list-item" href="#"><span class="material-icons list-item__graphic">home</span> Inicio</a>
                <a class="list-item" href="#"><span class="material-icons list-item__graphic">school</span> Cátedras</a>
                <a class="list-item list-item--activated" href="#"><span class="material-icons list-item__graphic">local_shipping</span> Costos</a>
                <a class="list-item" href="#"><span class="material-icons list-item__graphic">volunteer_activism</span> Retiros</a>
                <hr class="list-divider">
                <h2 class="list-group__subheader">Información</h2>
                <a class="list-item" href="Nosotros.htm">Nosotros</a>
                <a class="list-item" href="advertencia.htm">Aviso</a>
                <hr class="list-divider">
                <div class="list-links">
                    <a href="https://discord.gg/9YKHHZTMUb">Discord</a> <a href="https://github.com/tw0b1t5/guia-pc/tree/main">Ver en Github</a>
                </div>
            </nav>
        </div>
    </aside>
    <div class="drawer-scrim"></div>
    `;
    const footerHTML = `
    <link rel="stylesheet" href="../src/css/ui/footer.css">
    <footer class="grid text-primary">
        <section class="grid__col--span-12">
            <slot></slot>
        </section>
    </footer>
    `;
    const roadmapHTML = `
    <link rel="stylesheet" href="../src/css/ui/roadmap.css">
    <div class="container">
        <div class="title-container">
            <span class="title">Semana 1</span>
            <span class="title">Semana 2</span>
            <span class="title">Semana 3</span>
            <span class="title">Semana 4 <span class="subtitle">(parte 1)</span></span>
            <span class="title">Semana 4 <span class="subtitle">(parte 2)</span></span>
            <span class="title">Semana 5</span>
            <span class="title">Semana 6</span>
            <span class="title">Semana 7</span>
        </div>
        <div class="map-container">
            <div class="chapter">
                <a href="/guia-pc/pages/semana-1/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-1/ejercicio-7" class="episode">7</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-2/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-7" class="episode">7</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-8" class="episode">8</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-9" class="episode">9</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-10" class="episode">10</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-11" class="episode">11</a>
                <a href="/guia-pc/pages/semana-2/ejercicio-12" class="episode">12</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-3/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-7" class="episode">7</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-8" class="episode">8</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-9" class="episode">9</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-10" class="episode">10</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-11" class="episode">11</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-12" class="episode">12</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-13" class="episode">13</a>
                <a href="/guia-pc/pages/semana-3/ejercicio-14" class="episode">14</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-4/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-7" class="episode">7</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-8" class="episode">8</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-9" class="episode">9</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-10" class="episode">10</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-11" class="episode">11</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-12" class="episode">12</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-13" class="episode">13</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-4/ejercicio-14" class="episode">14</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-15" class="episode">15</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-16" class="episode">16</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-17" class="episode">17</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-18" class="episode">18</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-19" class="episode">19</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-20" class="episode">20</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-21" class="episode">21</a>
                <a href="/guia-pc/pages/semana-4/ejercicio-22" class="episode">22</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-5/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-5/ejercicio-7" class="episode">7</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-6/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-7" class="episode">7</a>
                <a href="/guia-pc/pages/semana-6/ejercicio-8" class="episode">8</a>
            </div>
            <div class="chapter">
                <a href="/guia-pc/pages/semana-7/ejercicio-1" class="episode">1</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-2" class="episode">2</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-3" class="episode">3</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-4" class="episode">4</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-5" class="episode">5</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-6" class="episode">6</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-7" class="episode">7</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-8" class="episode">8</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-9" class="episode">9</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-10" class="episode">10</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-11" class="episode">11</a>
                <a href="/guia-pc/pages/semana-7/ejercicio-12" class="episode">12</a>
            </div>
        </div>
    </div>
    `;

    generateElementTemplate('app-bar', appBarHTML);
    generateElementTemplate('app-drawer', drawerHTML);
    generateElementTemplate('app-footer', footerHTML);
    generateElementTemplate('road-map', roadmapHTML);

    function waitForElm(selector) {
        try {
            selector.getBoundingClientRect.width;
        } catch {
            throw new Error(`Error (waitForElm): se esperaba un selector.`);
        }

        return new Promise(resolve => {
            if (selector) {
                return resolve(selector);
            }

            const observer = new MutationObserver(mutations => {
                if (selector) {
                    resolve(selector);
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function drawerFoundation() {
        const toggleButton = document.querySelector('app-bar').shadowRoot.querySelector('.top-app-bar__section--align-start > .icon-button'),
            drawer = document.querySelector('app-drawer').shadowRoot.querySelector('.drawer'),
            drawerWidth = drawer.getBoundingClientRect().width,
            drawerScrim = drawer.nextElementSibling,
            classes = {
                'open': 'drawer--open',
                'opening': 'drawer--opening',
                'animate': 'drawer--animate',
                'closing': 'drawer--closing',
                'dragged': 'drawer--dragged'
            };
        let isDrawerOpen = false,
            isDrawerDragged = false,
            drawerRect = drawer.getBoundingClientRect(),
            drawerEndX = drawerRect.left + drawerRect.width,
            startX,
            distanceX;

        function toggleDrawer() {
            !isDrawerOpen ? openDrawer() : closeDrawer();
        }

        function openDrawer() {
            isDrawerOpen = true;
            drawer.classList.add(classes.open, classes.animate, classes.opening);
        }

        function closeDrawer() {
            isDrawerOpen = false;
            drawer.classList.add(classes.closing);
            drawer.classList.remove(classes.open);
        }

        function unanimateDrawer() {
            drawer.classList.remove(classes.animate, classes.opening, classes.closing);
        }

        [toggleButton, drawerScrim].forEach(function(element) {
            element.addEventListener('click', toggleDrawer);
        });

        toggleButton.addEventListener('click', toggleDrawer);

        drawer.addEventListener('transitionend', unanimateDrawer);

        // @todo: handle focus on drawer.

        // Drag to open/close drawer.
        drawer.addEventListener('mousedown', function(event) {
            if (!isDrawerDragged) {
                startX = event.clientX;
                isDrawerDragged = true;
            }
        });

        document.addEventListener('mousemove', function(event) {
            if (isDrawerDragged && !isDrawerOpen) {
                distanceX = event.clientX - startX;
                drawer.style.transform = 'translateX(' + clamp(-drawerWidth, -drawerWidth + distanceX, 0) + 'px)';
            } else if (isDrawerDragged && isDrawerOpen) {
                distanceX = event.clientX;
                drawer.style.transform = 'translateX(' + clamp(-drawerWidth, distanceX - startX, 0) + 'px)';
            }

            if (isDrawerDragged) {
                drawerEndX = drawer.getBoundingClientRect().left + drawerRect.width;
                drawerScrim.style.opacity = drawerEndX * 100 / drawerWidth + '%';
                document.body.classList.add(classes.dragged);
                drawer.classList.add(classes.dragged);
            }
        });

        document.addEventListener('mouseup', function() {
            if (isDrawerDragged) {
                drawerScrim.removeAttribute('style');
                drawer.removeAttribute('style');
                document.body.removeAttribute('class');
                drawer.classList.remove(classes.dragged);

                let deltaX = distanceX - startX,
                    absDeltaX = Math.abs(deltaX);

                if (absDeltaX > 24) {
                    !isDrawerOpen && deltaX > (drawerWidth / 2) || isDrawerOpen && deltaX > (-drawerWidth / 2) ? openDrawer() : closeDrawer();
                }

                isDrawerDragged = false;
            }
        });

        // Utility functiion: clamp a number between two other numbers.
        function clamp(min, number, max) {
            return Math.max(min, Math.min(number, max));
        }
    }

    waitForElm(document.querySelector('app-drawer').shadowRoot.querySelector('.drawer')).then((elm) => {
        setTimeout(function() {
            drawerFoundation();
        }, 100);
    });
}());