(function() {
    'use strict';

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
                let pyUrl = location.href.replace('/pages', '/src/python');

                if (pyUrl.includes('.html')) {
                    return pyUrl.replace('html', 'py');
                } else {
                    return pyUrl + '.py';
                }
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

    animateOnView('[will-animate]');
    addPythonCode();
}());
