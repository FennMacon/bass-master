'use strict';

const referenceToolbar = document.querySelector('.reference-toolbar');

if (referenceToolbar) {
    const diagrams = [...referenceToolbar.querySelectorAll('button[aria-controls]')].map(button => ({
        button,
        panel: document.getElementById(button.getAttribute('aria-controls')),
    }));
    let activeDiagram = null;

    function updateLayout() {
        const isFixed = getComputedStyle(referenceToolbar).position === 'fixed';
        const height = isFixed ? referenceToolbar.getBoundingClientRect().height : 0;
        document.documentElement.style.setProperty('--footer-height', `${height}px`);

        const imageRegion = activeDiagram?.panel.querySelector('.reference-image');
        if (!imageRegion) return;

        // Add a keyboard stop only when there is more of the diagram to scroll to.
        if (imageRegion.scrollWidth > imageRegion.clientWidth) {
            imageRegion.tabIndex = 0;
            imageRegion.setAttribute('role', 'region');
            imageRegion.setAttribute('aria-label', `${activeDiagram.button.textContent.trim()} diagram, horizontally scrollable`);
        } else {
            imageRegion.removeAttribute('tabindex');
            imageRegion.removeAttribute('role');
            imageRegion.removeAttribute('aria-label');
        }
    }

    function showDiagram(diagram) {
        if (activeDiagram) {
            activeDiagram.button.setAttribute('aria-expanded', 'false');
            activeDiagram.panel.hidden = true;
        }
        activeDiagram = diagram;
        if (activeDiagram) {
            activeDiagram.panel.hidden = false;
            activeDiagram.button.setAttribute('aria-expanded', 'true');
        }
        updateLayout();
    }

    for (const diagram of diagrams) {
        diagram.button.addEventListener('click', () => {
            showDiagram(activeDiagram === diagram ? null : diagram);
            if (activeDiagram && getComputedStyle(diagram.panel).position === 'static') {
                diagram.panel.scrollIntoView({ block: 'nearest', inline: 'nearest' });
            }
        });
    }
    document.getElementById('hideAllButton').addEventListener('click', () => showDiagram(null));
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape' || event.defaultPrevented || !activeDiagram) return;

        const trigger = activeDiagram.button;
        const focusWasInToolbar = referenceToolbar.contains(document.activeElement);
        showDiagram(null);
        if (focusWasInToolbar) trigger.focus();
    });

    if ('ResizeObserver' in window) {
        new ResizeObserver(updateLayout).observe(referenceToolbar);
    }
    window.addEventListener('resize', updateLayout);
    updateLayout();
}
