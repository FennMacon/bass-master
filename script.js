'use strict';

const toolbar = document.querySelector('.reference-toolbar');
if (toolbar) {
    const toggles = [...toolbar.querySelectorAll('button[aria-controls]')];
    let activeToggle = null;
    function closePanels() {
        toggles.forEach(button => {
            button.setAttribute('aria-expanded', 'false');
            document.getElementById(button.getAttribute('aria-controls')).hidden = true;
        });
        activeToggle = null;
    }
    toggles.forEach(button => {
        button.addEventListener('click', () => {
            const wasOpen = button.getAttribute('aria-expanded') === 'true';
            closePanels();
            if (!wasOpen) {
                document.getElementById(button.getAttribute('aria-controls')).hidden = false;
                button.setAttribute('aria-expanded', 'true');
                activeToggle = button;
            }
        });
    });
    document.getElementById('hideAllButton').addEventListener('click', closePanels);
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && activeToggle) {
            const trigger = activeToggle;
            closePanels();
            trigger.focus();
        }
    });
    function measureToolbar() {
        const height = getComputedStyle(toolbar).position === 'fixed' ? toolbar.getBoundingClientRect().height : 0;
        document.documentElement.style.setProperty('--footer-height', `${height}px`);
    }
    if ('ResizeObserver' in window) new ResizeObserver(measureToolbar).observe(toolbar);
    window.addEventListener('resize', measureToolbar);
    measureToolbar();
}
