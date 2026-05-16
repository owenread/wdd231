
const navButton = document.querySelector('#nav-button');
const nav = document.querySelector('#nav-bar');

if (navButton && nav) {
    navButton.addEventListener('click', () => {
        const isExpanded = navButton.getAttribute('aria-expanded') === 'true';
        navButton.classList.toggle('show');
        nav.classList.toggle('show');
        navButton.setAttribute('aria-expanded', String(!isExpanded));
    });
}