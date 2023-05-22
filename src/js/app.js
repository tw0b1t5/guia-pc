(function() {
    'use strict';

    // Creamos elementos reutilizables usando Elementos Personalizados y Shadow DOM.
    function generateElementTemplate(name, templateName) {
        customElements.define(name, class extends HTMLElement {
            constructor() {
                super();

                // Adjuntamos un shadow root al elemento.
                let shadowRoot = this.attachShadow({mode: 'open'});
                shadowRoot.appendChild(templateName.content.cloneNode(true));
            }
        });
    }

    function generateSnackbar(label, actionLabel, autoDismissDelay) {
        if (document.querySelector('.mdc-snackbar')) return;

        let snackbarTemplate = document.createElement('template');
        const snackbarHTML = `
<div class="mdc-snackbar">
    <div class="mdc-snackbar__surface">
        <div class="mdc-snackbar__label" role="status" aria-live="polite">
            ${label}
        </div>
        <div class="mdc-snackbar__actions">
            <button type="button" class="button mdc-snackbar__action">
                <div class="mdc-button__label">
                    ${actionLabel}
                </div>
            </button>
            <!-- <button class="mdc-icon-button mdc-snackbar__dismiss material-icons" title="Descartar">close</button> -->
        </div>
    </div>
</div>
        `;

        document.body.insertAdjacentHTML('beforeend', snackbarHTML);
        const snackbar = document.querySelector('.mdc-snackbar'),
            closeButton = document.querySelector('.mdc-snackbar__action');

        function removeSnackbar() {
            snackbar.classList.remove('mdc-snackbar--open');
            snackbar.classList.add('mdc-snackbar--closing');

            snackbar.addEventListener('transitionend', function() {
                snackbar.remove();
            });
        }

        setTimeout(function showSnackBar() {
            snackbar.classList.add('mdc-snackbar--opening', 'mdc-snackbar--open');
            snackbar.addEventListener('transitionend', function() {
                snackbar.classList.remove('mdc-snackbar--opening');
            });

            setTimeout(removeSnackbar, autoDismissDelay || 5000);
        }, 50);

        closeButton.addEventListener('click', removeSnackbar);
    }

    function addTemplates() {
        let appbarTemplate = document.createElement('template'),
            footerTemplate = document.createElement('template');

        appbarTemplate.innerHTML = `<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
                    <a class="button" href="https://tw0b1t5.github.io/guia-pc/pages/index.html" tooltip-text="Inicio" tooltip-position="bottom h-centered"><span class="material-icons">home</span><span class="visually-hidden">Inicio</span></a>
                </li>
                <li>
                    <a class="button" href="#" tooltip-text="Unidades" tooltip-position="bottom h-centered"><span class="material-icons">menu_book</span><span class="visually-hidden">Unidades</span></a>
                </li>
                <li>
                    <a class="button" href="#" tooltip-text="Doná" tooltip-position="bottom h-centered"><span class="material-icons">volunteer_activism</span><span class="visually-hidden">Doná</span></a>
                </li>
                <li>
                    <a class="button" href="#" tooltip-text="Contacto" tooltip-position="bottom h-centered" style="--x: -12px;"><span class="material-icons">call</span><span class="visually-hidden">Contacto</span></a>
                </li>
                <li>
                    <a class="button" href="https://github.com/tw0b1t5/guia-pc/tree/main" target="_blank" tooltip-text="Ver en Github" tooltip-position="bottom" style="--x: -124px;">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96" class="material-icons">
                            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="currentColor"/>
                        </svg>
                        <span class="visually-hidden">Ver en Github</span>
                    </a>
                </li>
            </ul>
        </section>
    </div>
</header>
        `;
        footerTemplate.innerHTML = `<style>
.grid {
    display: grid;
    gap: var(--grid-gutter);
    grid-template-columns: repeat(12, minmax(5px, 1fr));
    max-width: 2280px;
}

main.grid.grid__padding {
    margin-top: var(--app-bar-dense-height);
}

.grid .grid__col--span-0 {
    display: none;
}

.grid :is(.grid__col--span-1,
.grid__col--span-2,
.grid__col--span-3,
.grid__col--span-4,
.grid__col--span-5,
.grid__col--span-6,
.grid__col--span-7,
.grid__col--span-8,
.grid__col--span-9,
.grid__col--span-10,
.grid__col--span-11,
.grid__col--span-12) {
    grid-column-end: span 12;
}

@media only screen and (min-width: 576px) {
    .grid .grid__col--span-1 {
        grid-column-end: span 1;
    }

    .grid .grid__col--span-2 {
        grid-column-end: span 2;
    }

    .grid .grid__col--span-3 {
        grid-column-end: span 3;
    }

    .grid .grid__col--span-4 {
        grid-column-end: span 4;
    }

    .grid .grid__col--span-5 {
        grid-column-end: span 5;
    }

    .grid .grid__col--span-6 {
        grid-column-end: span 6;
    }

    .grid .grid__col--span-7 {
        grid-column-end: span 7;
    }

    .grid .grid__col--span-8 {
        grid-column-end: span 8;
    }

    .grid .grid__col--span-9 {
        grid-column-end: span 9;
    }

    .grid .grid__col--span-10 {
        grid-column-end: span 10;
    }

    .grid .grid__col--span-11 {
        grid-column-end: span 11;
    }

    .grid .grid__col--span-12 {
        grid-column-end: span 12;
    }
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
    :root {
        --grid-gutter: var(--grid-gutter-small);
        --breakpoint: var(--breakpoint-small);
    }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
    :root {
        --grid-gutter: var(--grid-gutter-medium);
        --breakpoint: var(--breakpoint-medium);
    }
}

@media only screen and (min-width: 992px) and (max-width: 1199px) {
    :root {
        --grid-gutter: var(--grid-gutter-large);
        --breakpoint: var(--breakpoint-large);
    }
}

@media only screen and (min-width: 1200px) {
    :root {
        --grid-gutter: var(--grid-gutter-extra-large);
        --breakpoint: var(--breakpoint-extra-large);
    }
}

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

.text-on-background {
    color: var(--theme-on-background);
}

.text-primary {
    color: var(--theme-primary-on-background);
}

footer ul {
    list-style: none;
    margin: 1em 0 0 0;
    padding: 0;
}

footer li {
    line-height: 2;
}

footer a {
    color: var(--theme-secondary-on-background);
    font: 400 .75rem/1.25rem var(--theme-font-secondary);
    text-decoration: none;
}</style>
<footer class="grid text-primary">
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 1</span>
        <ul>
            <li><a href="/pages/semana-1/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-1/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-1/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-1/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-1/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-1/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-1/ejercicio-7.html">Ejercicio 7</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 2</span>
        <ul>
            <li><a href="/pages/semana-2/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-2/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-2/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-2/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-2/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-2/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-2/ejercicio-7.html">Ejercicio 7</a></li>
            <li><a href="/pages/semana-2/ejercicio-8.html">Ejercicio 8</a></li>
            <li><a href="/pages/semana-2/ejercicio-9.html">Ejercicio 9</a></li>
            <li><a href="/pages/semana-2/ejercicio-10.html">Ejercicio 10</a></li>
            <li><a href="/pages/semana-2/ejercicio-11.html">Ejercicio 11</a></li>
            <li><a href="/pages/semana-2/ejercicio-12.html">Ejercicio 12</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 3</span>
        <ul>
            <li><a href="/pages/semana-3/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-3/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-3/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-3/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-3/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-3/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-3/ejercicio-7.html">Ejercicio 7</a></li>
            <li><a href="/pages/semana-3/ejercicio-8.html">Ejercicio 8</a></li>
            <li><a href="/pages/semana-3/ejercicio-9.html">Ejercicio 9</a></li>
            <li><a href="/pages/semana-3/ejercicio-10.html">Ejercicio 10</a></li>
            <li><a href="/pages/semana-3/ejercicio-11.html">Ejercicio 11</a></li>
            <li><a href="/pages/semana-3/ejercicio-12.html">Ejercicio 12</a></li>
            <li><a href="/pages/semana-3/ejercicio-13.html">Ejercicio 13</a></li>
            <li><a href="/pages/semana-3/ejercicio-14.html">Ejercicio 14</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 4</span>
        <ul>
            <li><a href="/pages/semana-4/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-4/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-4/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-4/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-4/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-4/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-4/ejercicio-7.html">Ejercicio 7</a></li>
            <li><a href="/pages/semana-4/ejercicio-8.html">Ejercicio 8</a></li>
            <li><a href="/pages/semana-4/ejercicio-9.html">Ejercicio 9</a></li>
            <li><a href="/pages/semana-4/ejercicio-10.html">Ejercicio 10</a></li>
            <li><a href="/pages/semana-4/ejercicio-11.html">Ejercicio 11</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1" style="color: transparent;">.</span>
        <ul>
            <li><a href="/pages/semana-4/ejercicio-12.html">Ejercicio 12</a></li>
            <li><a href="/pages/semana-4/ejercicio-13.html">Ejercicio 13</a></li>
            <li><a href="/pages/semana-4/ejercicio-14.html">Ejercicio 14</a></li>
            <li><a href="/pages/semana-4/ejercicio-15.html">Ejercicio 15</a></li>
            <li><a href="/pages/semana-4/ejercicio-16.html">Ejercicio 16</a></li>
            <li><a href="/pages/semana-4/ejercicio-17.html">Ejercicio 17</a></li>
            <li><a href="/pages/semana-4/ejercicio-18.html">Ejercicio 18</a></li>
            <li><a href="/pages/semana-4/ejercicio-19.html">Ejercicio 19</a></li>
            <li><a href="/pages/semana-4/ejercicio-20.html">Ejercicio 20</a></li>
            <li><a href="/pages/semana-4/ejercicio-21.html">Ejercicio 21</a></li>
            <li><a href="/pages/semana-4/ejercicio-22.html">Ejercicio 22</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 5</span>
        <ul>
            <li><a href="/pages/semana-5/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-5/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-5/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-5/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-5/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-5/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-5/ejercicio-7.html">Ejercicio 7</a></li>
        </ul>
    </section>
    <section class="grid__col--span-4">
        <span class="text-subtitle-1">Semana 6</span>
        <ul>
            <li><a href="/pages/semana-6/ejercicio-1.html">Ejercicio 1</a></li>
            <li><a href="/pages/semana-6/ejercicio-2.html">Ejercicio 2</a></li>
            <li><a href="/pages/semana-6/ejercicio-3.html">Ejercicio 3</a></li>
            <li><a href="/pages/semana-6/ejercicio-4.html">Ejercicio 4</a></li>
            <li><a href="/pages/semana-6/ejercicio-5.html">Ejercicio 5</a></li>
            <li><a href="/pages/semana-6/ejercicio-6.html">Ejercicio 6</a></li>
            <li><a href="/pages/semana-6/ejercicio-7.html">Ejercicio 7</a></li>
            <li><a href="/pages/semana-6/ejercicio-8.html">Ejercicio 8</a></li>
        </ul>
    </section>
</footer>
        `;

        generateElementTemplate('app-bar', appbarTemplate);
        generateElementTemplate('app-footer', footerTemplate);
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

        if (!targetElement) return;

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
                    <button class="code-button theme-button" tooltip-text="Cambiar de tema" tooltip-position="left"><span class="material-icons">brightness_6</span><span class="visually-hidden">Cambiar de tema</span></button>
                    <button class="code-button text-wrap-button" tooltip-text="Alternar ajuste de texto" tooltip-position="left"><span class="material-icons">wrap_text</span><span class="visually-hidden">Alternar ajuste de texto</span></button>
                    <button class="code-button copy-button" tooltip-text="Copiar código" tooltip-position="left"><span class="material-icons">copy_all</span><span class="visually-hidden">Copiar código</span></button>
                    <button class="code-button comments-button" tooltip-text="Alternar comentarios" tooltip-position="left"><span class="material-icons">numbers</span><span class="visually-hidden">Mostrar/ocultar comentarios</span></button>
                </div>`;

                codeBlock.insertAdjacentHTML('beforeend', codeButtonsHTML);

                // Si el bloque de código tiene un alto inferior al del menú de botones, entonces
                // hacemos que dicho menú sea horizontal en vez de vertical. El 32 es un márgen
                // arbitrario extra.
                // @todo: Agregar un observador que detecte cambios en la altura del bloque de
                //        código y actualice el diseño del menú acorde.
                const buttonsContainer = document.querySelector('.code-buttons-container'),
                    buttonsMenuHeight = buttonsContainer.offsetHeight,
                    codeHeight = codeBlock.offsetHeight,
                    codeButtons = codeBlock.querySelectorAll('.code-button');

                if (codeHeight < buttonsMenuHeight + 32) {
                    codeBlock.classList.add('is-horizontal');

                    codeButtons.forEach(function(button) {
                        button.setAttribute('tooltip-position', 'left');
                    });
                }

                // Agregamos funcionalidad a los botones:
                // Este botón cambia el tema del editor cambiando el importe del CSS del mismo.
                function toggleCodeTheme() {
                    let codeTheme = document.querySelector('link[name="code-theme"]');
                    const themeButton = codeBlock.querySelector('.theme-button'),
                        currentTheme = codeTheme.getAttribute('href');

                    if (currentTheme.includes('felipec')) {
                        codeTheme.setAttribute('href', currentTheme.replace('felipec', 'atom-one-light'));
                    } else {
                        codeTheme.setAttribute('href', currentTheme.replace('atom-one-light', 'felipec'));
                    }
                }

                // Este botón activa el ajuste de texto así salta a una nueva línea al irse
                // mucho a la derecha.
                function toggleCodeTextWrap() {
                    if (!codeBlock.classList.contains('has-text-wrap')) {
                        codeBlock.classList.add('has-text-wrap');
                    } else {
                        codeBlock.classList.remove('has-text-wrap');
                    }
                }

                // Este botón copia al portapapeles el código en el bloque.
                async function copyCode() {
                    const code = codeBlock.innerText.split('brightness_6')[0];

                    await navigator.clipboard.writeText(code);

                    generateSnackbar('Texto copiado al portapapeles.', 'Cerrar');
                }

                // Este botón alterna la visibilidad de los comentarios (lo iba a hacer
                // con animación y que borrara y restaurara los comentarios de manera
                // en que no se pueda copiar los comentarios si fueron borrados, pero
                // queda mucho espacio en blanco e intentar solucionarlo parece ser más
                // complicado de lo que pensaba, así que de momento solo quedará como
                // una simple visualización del código sin los comentarios de por medio
                // [aunque estos sigan presentes en el DOM]).
                function toggleCodeComments() {
                    codeBlock.classList.toggle('hide-comments');
                }

                const themeButton = codeBlock.querySelector('.code-button.theme-button'),
                    textWrapButton = codeBlock.querySelector('.code-button.text-wrap-button'),
                    copyCodeButton = codeBlock.querySelector('.code-button.copy-button'),
                    commentsButton = codeBlock.querySelector('.code-button.comments-button');

                themeButton.addEventListener('click', toggleCodeTheme);
                textWrapButton.addEventListener('click', toggleCodeTextWrap);
                commentsButton.addEventListener('click', toggleCodeComments);
                copyCodeButton.addEventListener('click', async function() {
                    await copyCode();
                });

            });
        }
    }

    addTemplates();
    animateOnView('[will-animate]');
    addPythonCode();
}());