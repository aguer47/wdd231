let lastFocused;
export function openModal(backdropId, closeBtnId) {
    const backdrop = document.getElementById(backdropId);
    const closeBtn = document.getElementById(closeBtnId);
    if (!backdrop || !closeBtn) return () => { };

    lastFocused = document.activeElement;
    backdrop.classList.add('open');
    backdrop.setAttribute('aria-hidden', 'false');
    closeBtn.focus();

    function onKey(e) {
        if (e.key === 'Escape') close();
        
        const focusables = backdrop.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])');
        if (e.key === 'Tab' && focusables.length) {
            const first = focusables[0], last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    }
    function onBackdropClick(e) {
        if (e.target === backdrop) close();
    }
    function close() {
        backdrop.classList.remove('open');
        backdrop.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', onKey);
        backdrop.removeEventListener('click', onBackdropClick);
        closeBtn.removeEventListener('click', close);
        if (lastFocused) lastFocused.focus();
    }

    document.addEventListener('keydown', onKey);
    backdrop.addEventListener('click', onBackdropClick);
    closeBtn.addEventListener('click', close);
    return close;
}