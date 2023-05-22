(function() {
    'use strict';

    // Creamos elementos reutilizables usando Elementos Personalizados y Shadow DOM.
    function addTemplates() {
        let navBarTemplate = document.createElement('template'),
            footerTemplate = document.createElement('template');

        navBarTemplate.innerHTML = `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
<style>
.top-app-bar {
    animation: app-bar-slide-in 500ms var(--motion-easing-standard);
    background-color: var(--elevation-4dp-background-color);
    box-shadow: var(--elevation-4dp-box-shadow);
    color: var(--theme-on-background);
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    transform: translateY(0);
    width: 100%;
    z-index: 4;
}

.top-app-bar__row {
    display: flex;
    height: 64px;
    position: relative;
    width: 100%;
}

.top-app-bar--dense .top-app-bar__row {
    height: 48px;
}

.top-app-bar__section {
    align-items: center;
    display: inline-flex;
    flex: 1 1 auto;
    min-width: 0;
    padding: 8px 12px;
    z-index: 1;
}

.top-app-bar__section--align-start {
    justify-content: flex-start;
    order: -1;
}

.top-app-bar__section--align-end {
    justify-content: flex-end;
    order: 1;
}

.top-app-bar--dense .top-app-bar__section {
    padding: 0 4px;
}

.top-app-bar__title {
    font: 500 1.25rem/2rem var(--theme-font-base);
    letter-spacing: .0125em;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.top-app-bar--dense .top-app-bar__title {
    padding-left: 12px;
    padding-right: 0;
}

@keyframes app-bar-slide-in {
    0% {
        transform: translateY(-100%);
    }
}

.top-app-bar .button::before {
    background-color: currentColor;
}

.top-app-bar ul {
    display: flex;
    gap: var(--grid-gutter-small);
    list-style: none;
    margin: 0;
    padding: 0 12px 0 0;
}

.top-app-bar p {
    margin: 0;
}

.top-app-bar a {
    color: inherit;
    text-decoration: none;
}

.top-app-bar svg {
    fill: currentColor;
}

.top-app-bar + .grid {
    margin-top: var(--grid-gutter-extra-large);
}

@media only screen and (max-width: 1199px) {
    .top-app-bar .button {
        border: 0;
        border-radius: 50%;
        font-size: 0;
        height: 24px;
        line-height: 0;
        min-width: unset;
        padding: 8px;
        width: 24px;
    }

    .top-app-bar .button > svg {
        margin: 0;
    }
}

[tooltip-text] {
    position: relative;
    justify-content: unset;
}

[tooltip-text]::after {
    border: 1px solid rgba(0 0 0 / 0%);
    background-color: var(--mdc-plain-tooltip-container-color);
    border-radius: var(--mdc-plain-tooltip-container-shape);
    box-sizing: border-box;
    color: var(--mdc-plain-tooltip-supporting-text-color);
    content: attr(tooltip-text);
    font-family: var(--mdc-plain-tooltip-supporting-text-font);
    font-size: var(--mdc-plain-tooltip-supporting-text-size);
    font-weight: var(--mdc-plain-tooltip-supporting-text-weight);
    letter-spacing: var(--mdc-plain-tooltip-supporting-text-tracking);
    line-height: var(--mdc-plain-tooltip-supporting-text-line-height);
    max-height: 40vh;
    max-width: 200px;
    min-height: 24px;
    min-width: 40px;
    opacity: 0;
    outline: none;
    overflow: hidden;
    overflow-wrap: anywhere;
    padding: 4px 8px;
    position: absolute;
    transform: scale(.8) translate(var(--x, 0px), var(--y, 0px));
    transform-origin: var(--dir-x, unset) var(--dir-y);
    transition: transform 75ms cubic-bezier(.4, 0, 1, 1),
                opacity 75ms cubic-bezier(.4, 0, 1, 1);
    white-space: nowrap;
    word-break: break-all;
    word-break: var(--mdc-tooltip-word-break, normal);
    z-index: 9;
}

[tooltip-text]:is(:hover, :focus)::after {
    opacity: 1;
    transform: scale(1) translate(var(--x, 0px), var(--y, 0px));
    transition: transform 150ms cubic-bezier(0, 0, .2, 1),
                opacity 150ms cubic-bezier(0, 0, .2, 1);
}

@media screen and (forced-colors: active) {
    [tooltip-text]::after {
        border-color: CanvasText;
    }
}

[tooltip-text][tooltip-position*='top']::after {
    --y: calc(-100% - 16px);
    --dir-y: bottom;
    top: 0;
}

[tooltip-text][tooltip-position*='bottom']::after {
    --y: calc(100% + 16px);
    --dir-y: top;
    bottom: 0;
}

[tooltip-text][tooltip-position*='left']::after {
    --x: calc(-100% - 16px);
    --dir-x: right;
    left: 0;
}

[tooltip-text][tooltip-position*='right']::after {
    --x: calc(100% + 16px);
    --dir-x: left;
    right: 0;
}

[tooltip-text][tooltip-position*='v-centered']::after {
    --y: calc(-50%);
    --dir-y: center;
    top: 50%;
}

[tooltip-text][tooltip-position*='h-centered']::after {
    --x: calc(-50%);
    --dir-x: center;
    left: 50%;
}

.visually-hidden {
    clip: rect(1px,1px,1px,1px) !important;
    border: 0 !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important;
}

.material-icons {
    padding: 12px;
}</style>
<header class="top-app-bar top-app-bar--dense">
    <div class="top-app-bar__row">
        <section class="top-app-bar__section top-app-bar__section--align-start">
            <span class="top-app-bar__title"><slot></slot></span>
        </section>
        <section class="top-app-bar__section top-app-bar__section--align-end" role="toolbar">
            <ul>
                <li>
                    <a class="button" href="#" title="Home" tooltip-text="Inicio" tooltip-position="bottom h-centered"><span class="material-icons">home</span><span class="visually-hidden">Inicio</span></a>
                </li>
                <li>
                    <a class="button" href="#" title="Unidades" tooltip-text="Unidades" tooltip-position="bottom h-centered"><span class="material-icons">menu_book</span><span class="visually-hidden">Unidades</span></a>
                </li>
                <li>
                    <a class="button" href="#" title="Doná" tooltip-text="Doná" tooltip-position="bottom h-centered"><span class="material-icons">volunteer_activism</span><span class="visually-hidden">Doná</span></a>
                </li>
                <li>
                    <a class="button" href="#" title="Contacto" tooltip-text="Contacto" tooltip-position="bottom" style="--x: -84px;"><span class="material-icons">call</span><span class="visually-hidden">Contacto</span></a>
                </li>
            </ul>
        </section>
    </div>
</header>
        `;
        footerTemplate.innerHTML = `<style>
footer {
    background-color: var(--elevation-1dp-background-color);
    padding: var(--grid-gutter);
}

footer hr {
    border: none;
    border-top: 1px solid var(--theme-border-color);
    margin: var(--grid-gutter) 0;
}

footer p {
    margin: 0;
}

.footer-socials {
    align-items: center;
    display: flex;
    gap: 1rem;
}

.footer-socials-list {
    align-items: center;
    display: inline-flex;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.footer-socials-list li,
.footer-socials-list a {
    display: inline-block;
    height: 18px;
}

.footer-socials-list svg {
    fill: var(--theme-on-background);
}
</style>
<footer class="grid">
    <section class="grid__col--span-12">
        <div class="footer-socials">
            Síguenos en:
            <ul class="footer-socials-list">
                <li>
                    <a href="https://www.facebook.com/juniorenargentina/" target="_blank" title="Facebook">
                        <svg id="social-facebook" viewBox="0 0 18 18" height="18" width="18">
                            <path d="M15.7,1.5H2.3c-0.5,0-0.8,0.4-0.8,0.8v13.3c0,0.5,0.4,0.8,0.8,0.8h7.2v-5.8h-2V8.4h2V6.8c0-1.9,1.2-3,2.9-3 c0.8,0,1.5,0.1,1.7,0.1v2l-1.2,0c-0.9,0-1.1,0.4-1.1,1.1v1.4h2.2l-0.3,2.3h-1.9v5.8h3.8c0.5,0,0.8-0.4,0.8-0.8V2.3 C16.5,1.9,16.1,1.5,15.7,1.5z"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/juniorenarg" target="_blank" title="Twitter">
                        <svg id="social-twitter" viewBox="0 0 18 18" height="18" width="18">
                            <path d="M16.5,4.3c-0.6,0.2-1.1,0.4-1.8,0.5c0.6-0.4,1.1-1,1.4-1.7c-0.6,0.4-1.3,0.6-2,0.8c-0.6-0.6-1.4-1-2.2-1 c-1.7,0-3.1,1.4-3.1,3.1c0,0.2,0,0.5,0.1,0.7C6.3,6.5,4.1,5.3,2.5,3.4C2.3,3.9,2.1,4.4,2.1,5c0,1.1,0.5,2,1.4,2.6 c-0.5,0-1-0.2-1.4-0.4c0,0,0,0,0,0c0,1.5,1.1,2.8,2.5,3.1c-0.3,0.1-0.5,0.1-0.8,0.1c-0.2,0-0.4,0-0.6-0.1c0.4,1.2,1.5,2.1,2.9,2.2 c-1.1,0.8-2.4,1.3-3.8,1.3c-0.2,0-0.5,0-0.7,0c1.4,0.9,3,1.4,4.7,1.4c5.7,0,8.8-4.7,8.8-8.9c0-0.1,0-0.3,0-0.4 C15.6,5.5,16.1,4.9,16.5,4.3"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/@juniorenargentina" target="_blank" title="YouTube">
                        <svg id="social-youtube" viewBox="0 0 18 18" height="18" width="18">
                            <path d="M7.2,11.6V6.4L12,9.1L7.2,11.6z M17.8,5.3c0,0-0.2-1.2-0.7-1.8c-0.7-0.7-1.4-0.7-1.8-0.8C12.8,2.6,9,2.6,9,2.6 s-3.8,0-6.3,0.2c-0.3,0-1.1,0-1.8,0.8C0.4,4.1,0.2,5.3,0.2,5.3S0,6.8,0,8.2v1.5c0,1.5,0.2,2.9,0.2,2.9s0.2,1.2,0.7,1.8 c0.7,0.7,1.6,0.7,2,0.8c1.4,0.1,5.9,0.2,6.1,0.2c0,0,3.8,0,6.3-0.2c0.3,0,1.1,0,1.8-0.8c0.5-0.5,0.7-1.8,0.7-1.8S18,11.2,18,9.8V8.2 C18,6.8,17.8,5.3,17.8,5.3z"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/company/juniorenargentina/mycompany/" target="_blank" title="LinkedIn">
                        <svg id="social-linkedin" viewBox="0 0 18 18" height="18" width="18">
                            <path d="M15.4,1.5H2.6C2,1.5,1.5,2,1.5,2.6v12.8c0,0.6,0.5,1.1,1.1,1.1h12.8c0.6,0,1.1-0.5,1.1-1.1V2.6C16.5,2,16,1.5,15.4,1.5z M3.8,7.1H6v7.2H3.8V7.1z M4.9,6.1c-0.7,0-1.3-0.6-1.3-1.3c0-0.7,0.6-1.3,1.3-1.3c0.7,0,1.3,0.6,1.3,1.3C6.2,5.6,5.6,6.1,4.9,6.1z M14.5,14.3h-2.3v-3.5c0-0.8,0-1.9-1.2-1.9c-1.2,0-1.4,0.9-1.4,1.8v3.5H7.4V7.1h2.2v1h0c0.3-0.6,1-1.2,2.1-1.2 c2.3,0,2.7,1.5,2.7,3.4V14.3z"></path>
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/juniorenargentina/" target="_blank" title="Instagram">
                        <svg id="social-instagram" viewBox="0 0 18 18" height="18" width="18">
                            <path d="M9,2.9c2,0,2.2,0,3,0c0.7,0,1.1,0.2,1.4,0.3c0.4,0.1,0.6,0.3,0.9,0.6c0.3,0.3,0.4,0.5,0.6,0.9c0.1,0.3,0.2,0.7,0.3,1.4 c0,0.8,0,1,0,3s0,2.2,0,3c0,0.7-0.2,1.1-0.3,1.4c-0.1,0.4-0.3,0.6-0.6,0.9c-0.3,0.3-0.5,0.4-0.9,0.6c-0.3,0.1-0.7,0.2-1.4,0.3 c-0.8,0-1,0-3,0s-2.2,0-3,0c-0.7,0-1.1-0.2-1.4-0.3c-0.4-0.1-0.6-0.3-0.9-0.6c-0.3-0.3-0.4-0.5-0.6-0.9c-0.1-0.3-0.2-0.7-0.3-1.4 c0-0.8,0-1,0-3s0-2.2,0-3c0-0.7,0.2-1.1,0.3-1.4C3.3,4.2,3.5,4,3.7,3.7C4,3.5,4.2,3.3,4.6,3.2C4.8,3.1,5.2,2.9,6,2.9 C6.8,2.9,7,2.9,9,2.9 M9,1.5c-2,0-2.3,0-3.1,0c-0.8,0-1.3,0.2-1.8,0.3C3.6,2.1,3.2,2.3,2.8,2.8C2.3,3.2,2.1,3.6,1.9,4.1 c-0.2,0.5-0.3,1-0.3,1.8c0,0.8,0,1.1,0,3.1c0,2,0,2.3,0,3.1c0,0.8,0.2,1.3,0.3,1.8c0.2,0.5,0.4,0.9,0.9,1.3c0.4,0.4,0.8,0.7,1.3,0.9 c0.5,0.2,1,0.3,1.8,0.3c0.8,0,1.1,0,3.1,0s2.3,0,3.1,0c0.8,0,1.3-0.2,1.8-0.3c0.5-0.2,0.9-0.4,1.3-0.9c0.4-0.4,0.7-0.8,0.9-1.3 c0.2-0.5,0.3-1,0.3-1.8c0-0.8,0-1.1,0-3.1s0-2.3,0-3.1c0-0.8-0.2-1.3-0.3-1.8c-0.2-0.5-0.4-0.9-0.9-1.3c-0.4-0.4-0.8-0.7-1.3-0.9 c-0.5-0.2-1-0.3-1.8-0.3C11.3,1.5,11,1.5,9,1.5L9,1.5z"></path>
                            <path d="M9,5.1C6.9,5.1,5.1,6.9,5.1,9s1.7,3.9,3.9,3.9s3.9-1.7,3.9-3.9S11.1,5.1,9,5.1z M9,11.5c-1.4,0-2.5-1.1-2.5-2.5 S7.6,6.5,9,6.5s2.5,1.1,2.5,2.5S10.4,11.5,9,11.5z"></path>
                            <circle cx="13" cy="5" r="0.9"></circle>
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    </section>
    <hr class="grid__col--span-12">
    <section class="grid__col--span-12">
        <p class="text-body-2 text-secondary">Conocé nuestra <a href="https://junior.org.ar/politica-de-privacidad/" target="_blank">Política de privacidad</a> | ©2022 Junior Achievement Argentina. Todos los derechos reservados.</a>
    </section>
</footer>
        `;

        customElements.define('app-bar', class extends HTMLElement {
            constructor() {
                super();

                // Adjuntamos un shadow root al elemento.
                let shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(navBarTemplate.content.cloneNode(true));
            }
        });

        customElements.define('app-footer', class extends HTMLElement {
            constructor() {
                super();

                let shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(footerTemplate.content.cloneNode(true));
            }
        });
    }

    // Mostramos elementos a medida que el usuario se desplaza hacia ellos.
    function animateOnView(targets) {
        try {
            document.querySelectorAll(targets);
        } catch {
            throw new Error('Error (animateOnView): Se esperaba una lista de selectores válida.');
        }

        const isReducedMotionEnabled = window.matchMedia('(prefers-reduced-motion: reduce)').matches,
              animatedElements = document.querySelectorAll(targets);

        if (isReducedMotionEnabled) {
            animatedElements.forEach(function(elem) {
                elem.setAttribute('animated', '')
            });
        }

        animatedElements.forEach(function (elem) {
            const animationDelay = elem.getAttribute('animation-delay') || 0,
                  animationMargin = elem.getAttribute('animation-margin') || '0px 0px -20% 0px',
                  animationThreshold = elem.getAttribute('animation-threshold') || 0;
            attachViewportObserver(elem, animationDelay, animationMargin, animationThreshold);
        });

        function attachViewportObserver(elem, delay, margin, threshold) {
            let observerConfig = {
                rootMargin: margin,
                threshold: threshold
            };

            let observer = new IntersectionObserver(function (o) {
                o.forEach(function (e) {
                    e.isIntersecting && handleIntersection(delay);
                });
            }, observerConfig);

            observer.observe(elem);

            function handleIntersection(delay) {
                setTimeout(function () {
                    elem.setAttribute('animated', '');
                    observer.disconnect();
                }, delay || 0);
            }
        }
    }

    // Cargamos código de Python y le damos resaltado de sintáxis usando highlight.js. 
    function addPythonCode(url, target) {
        try {
            document.getElementById(target);
        } catch {
            throw new Error('Error (addPythonCode): Se esperaba una ID de un elemento existente.');
        }

        const targetElement = document.getElementById('py-target') || target,
              pythonUrl = getPyUrl() || url;

        fetch(pythonUrl)
            .then(response => response.text())
            .then(data => {
                targetElement.textContent = data;
                hljs.highlightAll();
                addCodeButtons();
            })
            .catch(error => {
                console.error('Error (addPythonCode):', error);
            });

        function getPyUrl() {
            // Revisamos si el elemento objetivo posee el atributo "custom-pysrc" y si
            // dicho atributo tiene algún valor.
            if (targetElement.getAttribute('custom-pysrc')) {
                // Si tiene un valor, se usa la ruta hacia la carpeta "python" y se busca un
                // archivo Python cuyo nombre sea el valor del atributo "custom-pysrc".
                const fileName = targetElement.getAttribute('custom-pysrc');

                return location.href.split('pages')[0] + `src/python/${fileName}.py`;
            } else {
                // Si no se encuentra un elemento con el atributo o dicho atributo no tiene
                // ningún valor, vamos a la carpeta de Python y devolvemos el archivo de la
                // semana y ejercicio actual.
                return location.href.replace('/pages', '/src/python').replace('html', 'py');
            }
        }

        function addCodeButtons() {
            const codeBlocks = document.querySelectorAll('.hljs');

            codeBlocks.forEach(function addCodeButtons(codeBlock) {
                const codeButtonsHTML = `
                <div class="code-buttons-container">
                    <button class="code-button" id="theme-button" tooltip-text="Cambiar de tema" tooltip-position="left"><span class="material-icons">brightness_6</span><span class="visually-hidden">Cambiar de tema</span></button>
                    <button class="code-button" id="text-wrap-button" tooltip-text="Alternar ajuste de texto" tooltip-position="left"><span class="material-icons">wrap_text</span><span class="visually-hidden">Alternar ajuste de texto</span></button>
                    <button class="code-button" id="copy-button" tooltip-text="Copiar código" tooltip-position="left"><span class="material-icons">copy_all</span><span class="visually-hidden">Copiar código</span></button>
                </div>`;

                codeBlock.insertAdjacentHTML('beforeend', codeButtonsHTML);
            });
        }
    }

    addTemplates();
    animateOnView('[will-animate]');
    addPythonCode();
}());