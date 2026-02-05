document.addEventListener('DOMContentLoaded', () => {
    //  Year 
    const yearEl = document.getElementById('year'); 
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    //  Last Modified 
    const modifiedEl = document.getElementById('lastModified'); 
    if (modifiedEl) {
        modifiedEl.textContent = document.lastModified;
    }

    //  Wayfinding 
    const links = document.querySelectorAll('.nav-links a[href]');
    const path = location.pathname;
    links.forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        if (path.endsWith(href) || (href === 'index.html' && (path.endsWith('/') || path.endsWith('finalproject') || path.endsWith('finalproject/')))) {
            a.setAttribute('aria-current', 'page');
        }
    });

    //  Hamburger 
    const hamburger = document.querySelector('.hamburger');
    const linksWrap = document.getElementById('primary-links');
    if (hamburger && linksWrap) {
        const toggle = () => {
            const isOpen = linksWrap.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };
        hamburger.addEventListener('click', toggle);
    }

    // Theme toggle 
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme') || 'light';
    if (storedTheme === 'dark') root.classList.add('dark');
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            root.classList.toggle('dark');
            localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
        });
    }
});
