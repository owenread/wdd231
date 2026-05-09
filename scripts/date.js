
const yearEl = document.querySelector('#current-year');
const modifiedEl = document.querySelector('#last-modified');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (modifiedEl) {
    modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}