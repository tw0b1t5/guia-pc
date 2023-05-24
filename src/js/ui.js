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

let roadmapTemplate = document.createElement('template'),
	appbarTemplate = document.createElement('template'),
	footerTemplate = document.createElement('template');

appbarTemplate.innerHTML = `
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
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
footerTemplate.innerHTML = `
<style>
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
    <section class="grid__col--span-12">
        <slot></slot>
    </section>
</footer>
`;
roadmapTemplate.innerHTML = `
<style>
html,
body {
align-items: center;
color-scheme: dark;
display: flex;
min-height: 100%;
font-family: Roboto, Arial, sans-serif;
justify-content: center;
}

.container {
--color-red: 239 154 154;
--color-pink: 244 143 177;
--color-purple: 206 147 216;
--color-deep-purple: 179 157 219;
--color-indigo: 159 168 218;
--color-blue: 144 202 249;
--color-light-blue: 129 212 250;
--color-cyan: 128 222 234;
--color-teal: 128 203 196;
--color-green: 165 214 167;
--color-light-green: 197 225 165;
--color-lime: 230 238 156;
--color-yellow: 255 245 157;
--color-amber: 255 224 130;
--color-orange: 255 204 128;
--color-deep-orange: 255 171 145;
--color-brown: 188 170 164;
--color-grey: 238 238 238;
--color-blue-grey: 176 190 197;
--color-primary: #4ea6ff;
--color-secondary: #ff8a65;
--color-background: #000;
--size-factor: 1;
--node-border-width: calc(.125rem * var(--size-factor));
--node-font-size: calc(1rem * var(--size-factor));
--node-size: calc(2rem * var(--size-factor));
--stroke-height: calc(.125rem * var(--size-factor));
--stroke-width: calc(2rem * var(--size-factor));
--position: calc(var(--node-size) + var(--node-border-width) * 2 + var(--stroke-width));
align-items: center;
display: flex;
flex-direction: column;
padding-top: 2rem;
}

.title-container {
display: flex;
justify-content: space-between;
padding-left: calc(var(--node-size) * 3);
padding-right: calc(var(--node-size) * 0);
width: calc(var(--position) * 7);
}

.title {
opacity: .6;
text-orientation: mixed;
text-transform: uppercase;
transform: rotate(-145deg);
writing-mode: vertical-lr;
}

.subtitle {
font-size: 85%;
opacity: .6;
text-transform: initial;
}

.map-container {
align-items: flex-start;
display: flex;
flex-direction: row;
gap: var(--stroke-width);
justify-content: center;
padding: 6rem 0 2rem;
}

.chapter {
align-items: center;
display: flex;
flex-direction: column;
font: 400 var(--node-font-size)/1 Roboto, Arial, sans-serif;
/* This gap separates each node by the stroke's width. */
gap: var(--stroke-width);
justify-content: center;
z-index: 1;
}

.chapter:nth-child(even) {
flex-direction: column-reverse;
}

.episode {
	align-items: center;
	background-color: var(--color-background);
	border: var(--node-border-width) solid currentColor;
	border-radius: 50%;
	box-sizing: content-box;
	color: var(--color-primary);
	display: flex;
	height: var(--node-size);
	justify-content: center;
	outline: none;
	padding: 0;
	position: relative;
	text-decoration: none;
	width: var(--node-size);
}

.episode::selection {
	background-color: var(--color-primary);
	color: var(--color-background);
}

.episode::before {
	background-color: var(--color-primary);
	border-radius: inherit;
	content: '';
	height: 100%;
	opacity: .12;
	pointer-events: none;
	position: absolute;
	transform: scale(0);
	transition: transform 200ms ease-in,
				opacity 15ms;
	width: 100%;
	z-index: -1;
}

.episode:hover::before {
	transform: scale(2);
	transition: transform 300ms ease-out;
}

.episode:focus::before {
	opacity: .24;
	transform: scale(2.5);
	transition: transform 200ms ease-out;
}

/* Fixing chapters' positions so they end where the next one starts. */
.chapter:nth-child(1) {
transform: translateY(calc(var(--position) * 5));
}

.chapter:nth-child(4),
.chapter:nth-child(5) {
transform: translateY(calc(var(--position) * 1));
}

.chapter:nth-child(6),
.chapter:nth-child(7) {
transform: translateY(calc(var(--position) * 3));
}

.chapter:nth-child(8) {
transform: translateY(calc(var(--position) * -1));
}

/*
** Setting up primary and secondary colors for the nodes. While the
** primary is used in every node, the secondary color is used for
** the line that connects between each chapter so the transition is
** from the current chapter's color to the next one's. That also
** means that the primary color of the next chapter is the
** secondary one of the the previous'.
**/
.chapter:nth-child(1) .episode {
--color-primary: rgb(var(--color-light-blue));
--color-secondary: rgb(var(--color-deep-orange));
}

.chapter:nth-child(2) .episode {
--color-primary: rgb(var(--color-deep-orange));
--color-secondary: rgb(var(--color-deep-purple));
}

.chapter:nth-child(3) .episode {
--color-primary: rgb(var(--color-deep-purple));
--color-secondary: rgb(var(--color-green));
}

.chapter:nth-child(4) .episode {
--color-primary: rgb(var(--color-green));
--color-secondary: rgb(var(--color-red));
}

.chapter:nth-child(5) .episode {
--color-primary: rgb(var(--color-red));
--color-secondary: rgb(var(--color-yellow));
}

.chapter:nth-child(6) .episode {
--color-primary: rgb(var(--color-yellow));
--color-secondary: rgb(var(--color-teal));
}

.chapter:nth-child(7) .episode {
--color-primary: rgb(var(--color-teal));
--color-secondary: rgb(var(--color-pink));
}

.chapter:nth-child(8) .episode {
--color-primary: rgb(var(--color-pink));
--color-secondary: rgb(var(--color-blue));
}

/* Defining general properties for the lines between nodes. */
.chapter .episode::after {
background-color: currentColor;
display: inline-block;
height: var(--stroke-height);
position: absolute;
width: var(--stroke-width);
}

.chapter:nth-child(odd) .episode:not(:last-child)::after {
content: '';
transform: translateY(calc(var(--stroke-width) + var(--node-border-width))) rotate(90deg);
}

.chapter:nth-child(even) .episode:not(:last-child)::after {
content: '';
transform: translateY(calc((var(--stroke-width) + var(--node-border-width)) * -1)) rotate(90deg);
}

/* Line that connects to the next chapter. */
.chapter:not(:last-child) .episode:last-child::after {
background-image: linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary) 50%, var(--color-secondary) 50%);
content: '';
transform: translateX(calc(100% + var(--node-border-width)));
width: var(--stroke-width);
}
</style>
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

generateElementTemplate('app-bar', appbarTemplate);
generateElementTemplate('app-footer', footerTemplate);
generateElementTemplate('road-map', roadmapTemplate);